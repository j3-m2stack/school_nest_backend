import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import { ClassManagementService } from './class-management.service';
import { CreateClassDto } from './dto/create-class-management.dto';
import { UpdateClassDto } from './dto/update-class-management.dto';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

@ApiTags('Class Management')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('class')
export class ClassManagementController {
  constructor(private readonly classService: ClassManagementService) {}

  @Post()
  @ApiOperation({ summary: 'Create a class with multiple sections' })
  @ApiResponse({ status: 201, description: 'Class created successfully' })
  create(@Body() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all classes with their sections' })
  @ApiResponse({ status: 200, description: 'Classes fetched successfully' })
  findAll(@Query() query: BasePaginationDto) {
    return this.classService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single class with sections' })
  @ApiResponse({ status: 200, description: 'Class found' })
  findOne(@Param('id') id: number) {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update class and its sections' })
  @ApiResponse({ status: 200, description: 'Class updated successfully' })
  update(@Param('id') id: number, @Body() dto: UpdateClassDto) {
    return this.classService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete class and its sections' })
  @ApiResponse({ status: 200, description: 'Class deleted successfully' })
  delete(@Param('id') id: number) {
    return this.classService.delete(id);
  }
}
