import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateStudentAttendanceDto, CreateTeacherAttendanceDto } from './dto/create-attendance.dto';


@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('students')
  @ApiOperation({ summary: 'Mark student attendance' })
  markStudents(@Body() dto: CreateStudentAttendanceDto) {
    return this.service.markStudentAttendance(dto);
  }

  @Post('teachers')
  @ApiOperation({ summary: 'Mark teacher attendance' })
  markTeachers(@Body() dto: CreateTeacherAttendanceDto) {
    return this.service.markTeacherAttendance(dto);
  }
}
