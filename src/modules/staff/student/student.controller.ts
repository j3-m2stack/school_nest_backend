import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';

import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FilterStudentDto } from './dto/filter-student.dto';

@ApiTags('Students')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // ------------------------------------------------------------
  // CREATE STUDENT
  // ------------------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  // ------------------------------------------------------------
  // GET ALL STUDENTS
  // ------------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Get paginated list of students' })
  @ApiResponse({ status: 200, description: 'Students fetched successfully' })
  findAll(@Query() query: FilterStudentDto) {
    return this.studentService.findAll(query);
  }

  // ------------------------------------------------------------
  // GET SINGLE STUDENT
  // ------------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a single student by ID' })
  @ApiResponse({ status: 200, description: 'Student retrieved' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  // ------------------------------------------------------------
  // UPDATE STUDENT
  // ------------------------------------------------------------
  @Patch(':id')
  @ApiOperation({ summary: 'Update student details' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentService.update(id, dto);
  }

  // ------------------------------------------------------------
  // DELETE STUDENT
  // ------------------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.delete(id);
  }
}
