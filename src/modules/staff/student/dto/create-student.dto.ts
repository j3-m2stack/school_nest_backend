import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ParentInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  relation: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
}

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsDateString()
  dob: Date;

  @ApiProperty({ enum: ['male', 'female', 'other'] })
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  aadharNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty()
  @IsDateString()
  admissionDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Academic session ID' })
  @IsOptional()
  sessionId?: number;

  @ApiProperty({ description: 'Class ID for the student' })
  @IsOptional()
  classId?: number;

  @ApiProperty({ description: 'Section ID for the student' })
  @IsOptional()
  sectionId?: number;

  @ApiProperty({ enum: ['active', 'inactive'] })
  @IsEnum(['active', 'inactive'])
  status: string;

  @ApiProperty({ type: [ParentInput], required: false })
  @ValidateNested({ each: true })
  @Type(() => ParentInput)
  @IsArray()
  @IsOptional()
  parents?: ParentInput[];
}
