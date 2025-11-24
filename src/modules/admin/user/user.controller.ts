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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminUserDto } from './dto/create-user.dto';
import { FilterAdminUsersDto } from './dto/filter-admin-users.dto';
import { UpdateAdminUserDto } from './dto/update-user.dto';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/Guards/roles.guard';
import { AdminUserRole } from 'src/common/types/admin-user-role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Roles(AdminUserRole.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create staff or teacher' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() dto: CreateAdminUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of staff/teachers' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  findAll(@Query() query: FilterAdminUsersDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user' })
  @ApiResponse({ status: 200, description: 'User found' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(@Param('id') id: number, @Body() dto: UpdateAdminUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
