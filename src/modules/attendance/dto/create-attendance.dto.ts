import { ApiProperty } from '@nestjs/swagger';

export class StudentAttendanceItemDto {
  @ApiProperty()
  studentId: number;

  @ApiProperty({ enum: ['PRESENT', 'ABSENT', 'LATE'] })
  status: string;
}

export class CreateStudentAttendanceDto {
  @ApiProperty({ example: '2026-01-12' })
  date: string;

  @ApiProperty()
  classId: number;

  @ApiProperty()
  sectionId: number;

  @ApiProperty({ type: [StudentAttendanceItemDto] })
  students: StudentAttendanceItemDto[];
}

export class CreateTeacherAttendanceDto {
  @ApiProperty()
  teacherId: number;

  @ApiProperty({ example: '2026-01-12' })
  date: string;

  @ApiProperty({ enum: ['PRESENT', 'ABSENT', 'LEAVE'] })
  status: string;
}
