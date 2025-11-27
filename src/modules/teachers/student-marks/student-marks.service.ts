import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentMarkDto } from './dto/update-student-mark.dto';
import { StudentExamMarks } from 'src/db/models/student-exam-marks.model';
import { StudentAcademicRecord } from 'src/db/models/student-academic-record.model';
import { TeacherAssignment } from 'src/db/models/teacher-assignment.model';
import { CreateStudentMarksDto } from './dto/create-student-mark.dto';

@Injectable()
export class StudentMarksService {
 async addOrUpdateMarks(dto: CreateStudentMarksDto, user: any) {
    const academicRecord = await StudentAcademicRecord.findByPk(dto.studentAcademicRecordId);
    if (!academicRecord) throw new NotFoundException('Student academic record not found');

    // Get teacher assignments
    const assignments = await TeacherAssignment.findAll({
      where: { 
        teacherId: user.id,
        classId: academicRecord.classId,
        sectionId: academicRecord.sectionId,
      }
    });
    const allowedSubjects = assignments.map(a => a.subjectId);

    // Check all submitted subjects
    for (const s of dto.subjects) {
      if (!allowedSubjects.includes(s.subjectId)) {
        throw new ForbiddenException(`Not allowed to add marks for subject ${s.subjectId}`);
      }
    }

    const marksJson = dto.subjects.map(s => ({
      subjectId: s.subjectId,
      marksObtained: s.marksObtained,
      totalMarks: s.totalMarks
    }));

    // Upsert marks
    const existing = await StudentExamMarks.findOne({
      where: { studentAcademicRecordId: dto.studentAcademicRecordId, examType: dto.examType }
    });

    if (existing) {
      await existing.update({ marks: marksJson });
      return { message: 'Marks updated successfully', data: existing };
    }

    const created = await StudentExamMarks.create({
      studentAcademicRecordId: dto.studentAcademicRecordId,
      examType: dto.examType,
      marks: marksJson,
      teacherId: user.id
    });

    return { message: 'Marks added successfully', data: created };
  }

  async getMarksByStudent(studentAcademicRecordId: number) {
    return StudentExamMarks.findAll({ where: { studentAcademicRecordId } });
  }

  async getMarksByClass(classId: number, examType?: string) {
    const records = await StudentAcademicRecord.findAll({ where: { classId } });
    const studentIds = records.map(r => r.id);

    const where: any = { studentAcademicRecordId: studentIds };
    if (examType) where.examType = examType;

    return StudentExamMarks.findAll({ where });
  }
}
