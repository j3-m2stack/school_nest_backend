import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { AdminUserRole, AdminUserRoleEnum } from 'src/common/types/admin-user-role.enum';

class TeacherAssignmentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  classId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  sectionId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  subjectId: number;
}

export class CreateAdminUserDto {
  @ApiProperty({ example: 'teacher@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'TEACHER',
    enum: AdminUserRoleEnum,
  })
  @IsEnum(AdminUserRole)
  role: AdminUserRole;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Some street, Some city', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ example: '123456789012', required: false })
  @IsOptional()
  @IsString()
  aadharNumber?: string;

  @ApiProperty({ example: 'M.Sc Mathematics', required: false })
  @IsOptional()
  @IsString()
  qualification?: string;

  @ApiProperty({ example: 'Math Teacher', required: false })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsString()
  joiningDate?: string;

    @ApiProperty({ type: [TeacherAssignmentDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherAssignmentDto)
  assignments?: TeacherAssignmentDto[];
}

