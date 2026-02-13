import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import { paginatedFind } from 'src/common/utils/pagination.util';
import { Student } from 'src/db/models/student.model';
import { Parent } from 'src/db/models/parent.model';
import { StudentAcademicRecord } from 'src/db/models/student-academic-record.model';
import { FilterStudentDto } from './dto/filter-student.dto';
import { Section } from 'src/db/models/section.model';
import { ClassMst } from 'src/db/models/class.model';
import { Op } from 'sequelize';

@Injectable()
export class PublicService {
async findOne(id: number) {
    const student = await Student.findOne({
      where: { id },
      include: [
        { model: Parent },
        { model: StudentAcademicRecord, include: [Section, ClassMst] },
      ],
    });
    if (!student) throw new NotFoundException('Student not found');
      return {
      statusCode: 200,
      message: 'Student found successfully',
      data: student,
    };
  }

  async findAll(query: FilterStudentDto) {
    // Student filters
    const whereStudent: any = {};
    if (query.gender) whereStudent.gender = query.gender;
    if (query.search) whereStudent.firstName = { $like: `%${query.search}%` };

    // Academic record filters
    const whereRecord: any = {};
    if (query.classId) whereRecord.classId = query.classId;
    if (query.sectionId) whereRecord.sectionId = query.sectionId;
    if (query.sessionId) whereRecord.sessionId = query.sessionId;
    if (query.status) whereRecord.status = query.status;

    const students = await paginatedFind({
      model: Student,
      where: whereStudent,
      query,
      include: [
        { model: Parent },
        {
          model: StudentAcademicRecord,
          where: Object.keys(whereRecord).length > 0 ? whereRecord : undefined,
          required: Object.keys(whereRecord).length > 0,
          include: [Section, ClassMst],
        },
      ],
    });

    return {
      statusCode: 200,
      message: 'Students found successfully',
      data: students,
    };
  }

  async searchStudent(name: string, fatherName: string) {
    const students = await Student.findAll({
      where: {
        firstName: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [
        {
          model: Parent,
          where: fatherName
            ? {
                name: {
                  [Op.like]: `%${fatherName}%`,
                },
                relation: 'FATHER',
              }
            : undefined,
        },
      ],
    });

    return {
      statusCode: 200,
      message: 'Student search result',
      data: students,
    };
  }
}
