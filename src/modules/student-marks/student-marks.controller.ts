import { Controller, Post, Body, UseGuards, Req, Get, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import { StudentMarksService } from './student-marks.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStudentMarksDto } from './dto/create-student-mark.dto';


@ApiTags('Student Marks Management ')
@ApiBearerAuth()
@Roles( AdminUserRole.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('marks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentMarksController {
  constructor(private readonly service: StudentMarksService) {}

  @Post()
  @Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF, AdminUserRole.TEACHER)
  addMarks(@Body() dto: CreateStudentMarksDto, @Req() req) {
    return this.service.addOrUpdateMarks(dto, req.user);
  }

  @Get('student/:id')
  @Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF, AdminUserRole.TEACHER)
  getByStudent(@Param('id') studentAcademicRecordId: number) {
    return this.service.getMarksByStudent(studentAcademicRecordId);
  }

  @Get('class/:id')
  @Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
  getByClass(@Param('id') classId: number, @Query('examType') examType?: string) {
    return this.service.getMarksByClass(classId, examType);
  }
}
