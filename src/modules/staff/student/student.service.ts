import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { paginatedFind } from 'src/common/utils/pagination.util';
import { Parent } from 'src/db/models/parent.model';
import { Student } from 'src/db/models/student.model';
import { AcademicSession } from 'src/db/models/academic-session.model';
import { ClassMst } from 'src/db/models/class.model';
import { Section } from 'src/db/models/section.model';
import { StudentAcademicRecord } from 'src/db/models/student-academic-record.model';

@Injectable()
export class StudentService {
  constructor() {}

  // ---------------------------------------------------
  // CREATE
  // ---------------------------------------------------
  async create(dto: CreateStudentDto) {
    // Check email duplication
    if (dto.email) {
      const existingEmail = await Student.findOne({
        where: { email: dto.email },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already exists');
      }
    }

    // Check phone duplication
    if (dto.phone) {
      const existingPhone = await Student.findOne({
        where: { phone: dto.phone },
      });

      if (existingPhone) {
        throw new BadRequestException('Phone number already in use');
      }
    }

    const { parents, sessionId, classId, sectionId, ...studentPayload } = dto;

    const student = await Student.create(studentPayload);

    // If parent data exists in DTO
    if (dto.parents?.length) {
      for (const p of dto.parents) {
        await Parent.create({ ...p, studentId: student.id });
      }
    }

    if (sessionId && classId && sectionId) {
      const session = await AcademicSession.findByPk(sessionId);
      const cls = await ClassMst.findByPk(classId);
      const section = await Section.findByPk(sectionId);

      if (!session) throw new BadRequestException('Invalid sessionId');
      if (!cls) throw new BadRequestException('Invalid classId');
      if (!section) throw new BadRequestException('Invalid sectionId');

      await StudentAcademicRecord.create({
        studentId: student.id,
        sessionId,
        classId,
        sectionId,
        status: 'active',
      });
    }

    return {
      statusCode: 201,
      message: 'Student created successfully',
      data: student,
    };
  }

  // ---------------------------------------------------
  // LIST WITH PAGINATION
  // ---------------------------------------------------
  async findAll(query: any) {
    const where: any = {};

    if (query.status) where.status = query.status;
    if (query.gender) where.gender = query.gender;
    if (query.search) where.firstName = { $like: `%${query.search}%` };

    return paginatedFind({
      model: Student,
      where,
      query,
      include: [Parent],
    });
  }

  // ---------------------------------------------------
  // SINGLE DETAIL
  // ---------------------------------------------------
  async findOne(id: number) {
    const student = await Student.findOne({
      where: { id },
      include: [Parent],
    });

    if (!student) throw new NotFoundException('Student not found');

    return student;
  }

  // ---------------------------------------------------
  // UPDATE
  // ---------------------------------------------------
  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.findOne(id);
    const { parents, sessionId, classId, sectionId, ...updatePayload } = dto;

    await student.update(updatePayload);

    // Update parents
    if (parents?.length) {
      await Parent.destroy({ where: { studentId: id } });
      for (const p of parents) {
        await Parent.create({ ...p, studentId: id });
      }
    }

    // Update or create academic record
    if (sessionId && classId && sectionId) {
      let record = await StudentAcademicRecord.findOne({
        where: { studentId: id, status: 'active' },
      });
      if (record) {
        await record.update({ sessionId, classId, sectionId });
      } else {
        await StudentAcademicRecord.create({
          studentId: id,
          sessionId,
          classId,
          sectionId,
          status: 'active',
        });
      }
    }

    return {
      statusCode: 200,
      message: 'Student updated successfully',
      data: student,
    };
  }

  // ---------------------------------------------------
  // DELETE
  // ---------------------------------------------------
  async delete(id: number) {
    const student = await this.findOne(id);

    await Parent.destroy({ where: { studentId: id } });
    await student.destroy();

    return {
      statusCode: 200,
      message: 'Student deleted successfully',
    };
  }

async findByClass(classId: number) {
  const students = await StudentAcademicRecord.findAll({
    where: { classId },

    include: [
      {
        model: Student,
        include: [
          {
            model: Parent,
            attributes: ['name', 'relation', 'phone'],
          },
        ],
      },
      { model: Section, attributes: ['name'] },
      { model: ClassMst, attributes: ['name'] },
    ],
  });

  if (!students || students.length === 0) {
    throw new NotFoundException('No students found for this class');
  }

  return students.map((record) => {
    const student = record.student;

    const father = student.parents?.find((p) => p.relation?.toLowerCase() === 'father');
    const mother = student.parents?.find((p) => p.relation?.toLowerCase() === 'mother');

    return {
      /* ---- Student Basic Info ---- */
      firstName: student.firstName,
      lastName: student.lastName,
      dob: student.dob,
      gender: student.gender,
      photo: student.photo || '',

      /* ---- Parents Info ---- */
      fatherName: father?.name || '',
      fatherPhone: father?.phone || '',
      motherName: mother?.name || '',
      motherPhone: mother?.phone || '',

      /* ---- Class Details ---- */
      className: record.class.name,
      section: record.section.name,

      /* ---- Other Details ---- */
      admissionNo: student.id,
      phone: student.phone,
      address: student.address,

      /* ---- Auto session ---- */
      session: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    };
  });
}

}
