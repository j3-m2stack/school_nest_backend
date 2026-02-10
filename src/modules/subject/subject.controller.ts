import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Subject Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('subjects')
export class SubjectController {
  constructor(private readonly service: SubjectService) {}

  @Post()
  @Roles(AdminUserRole.ADMIN)
  create(@Body() dto: CreateSubjectDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF, AdminUserRole.TEACHER)
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF, AdminUserRole.TEACHER)
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(AdminUserRole.ADMIN)
  update(@Param('id') id: number, @Body() dto: UpdateSubjectDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(AdminUserRole.ADMIN)
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
