import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateAcademicSessionDto } from './dto/create-session.dto';

@ApiTags('Academic Sessions')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new academic session' })
  @ApiResponse({
    status: 201,
    description: 'Academic session created successfully',
  })
  create(@Body() dto: CreateAcademicSessionDto) {
    return this.sessionsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all academic sessions' })
  @ApiResponse({ status: 200, description: 'List of academic sessions' })
  findAll() {
    return this.sessionsService.findAll();
  }
}
