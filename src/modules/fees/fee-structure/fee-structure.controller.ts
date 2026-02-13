import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FeeStructureService } from './fee-structure.service';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';

@ApiTags('Fee Structure')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN, AdminUserRole.STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('fee-structure')
export class FeeStructureController {
  constructor(private readonly service: FeeStructureService) {}

  @Post()
  @ApiOperation({ summary: 'Create fee structure' })
  create(@Body() dto: CreateFeeStructureDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fee structures' })
  findAll() {
    return this.service.findAll();
  }
}
