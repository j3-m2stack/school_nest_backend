import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentFeeService } from './student-fee.service';
import { CreateStudentFeeDto } from './dto/create-student-fee.dto';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Student Fees')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('student-fees')
export class StudentFeeController {
  constructor(private readonly service: StudentFeeService) {}

  @Post()
  @ApiOperation({ summary: 'Assign fee to student' })
  create(@Body() dto: CreateStudentFeeDto) {
    return this.service.create(dto);
  }

  @Get(':studentId')
  @ApiOperation({ summary: 'Get student fee details' })
  getStudentFee(@Param('studentId') studentId: number) {
    return this.service.getStudentFee(studentId);
  }
}
