import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterStudentDto } from './dto/filter-student.dto';

@ApiTags('PUBLIC')
@Controller()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}
  @Get('public/students')
  @ApiOperation({ summary: 'Get list of students with optional filters' })
  findAll(@Query() query: FilterStudentDto) {
    return this.publicService.findAll(query);
  }

  @Get('public/student/:id')
  @ApiOperation({ summary: 'Get single student by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicService.findOne(id);
  }

    @Get('search')
  @ApiOperation({ summary: 'Search student by name and father name' })
  searchStudent(
    @Query('name') name: string,
    @Query('fatherName') fatherName: string,
  ) {
    return this.publicService.searchStudent(name, fatherName);
  }
}
