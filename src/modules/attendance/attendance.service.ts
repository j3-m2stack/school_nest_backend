import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateStudentAttendanceDto, CreateTeacherAttendanceDto } from './dto/create-attendance.dto';
import { StudentAttendance } from 'src/db/models/student-attendance.model';
import { StudentAttendanceItem } from 'src/db/models/student-attendance-item.model';
import { TeacherAttendance } from 'src/db/models/teacher-attendance.model';


@Injectable()
export class AttendanceService {
  // --------------------------------------------------
  // STUDENT ATTENDANCE
  // --------------------------------------------------
  async markStudentAttendance(dto: CreateStudentAttendanceDto) {
    const exists = await StudentAttendance.findOne({
      where: {
        date: dto.date,
        classId: dto.classId,
        sectionId: dto.sectionId,
      },
    });

    if (exists) {
      throw new BadRequestException('Attendance already marked for this date');
    }

    const attendance = await StudentAttendance.create({
      date: dto.date,
      classId: dto.classId,
      sectionId: dto.sectionId,
    });

    const items = dto.students.map((student) => ({
      attendanceId: attendance.id,
      studentId: student.studentId,
      status: student.status,
    }));

    await StudentAttendanceItem.bulkCreate(items);

    return {
      statusCode: 201,
      message: 'Student attendance marked successfully',
    };
  }

  // --------------------------------------------------
  // TEACHER ATTENDANCE
  // --------------------------------------------------
  async markTeacherAttendance(dto: CreateTeacherAttendanceDto) {
    const exists = await TeacherAttendance.findOne({
      where: {
        teacherId: dto.teacherId,
        date: dto.date,
      },
    });

    if (exists) {
      throw new BadRequestException('Attendance already marked for this teacher');
    }

    await TeacherAttendance.create({
      teacherId: dto.teacherId,
      date: dto.date,
      status: dto.status,
    });

    return {
      statusCode: 201,
      message: 'Teacher attendance marked successfully',
    };
  }
}
