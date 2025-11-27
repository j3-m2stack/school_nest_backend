import { IsOptional, IsString, IsNumber, IsEnum, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterStudentDto {
  @ApiPropertyOptional({ description: 'Search by student first or last name' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by class ID' })
  @IsOptional()
  classId?: number;

  @ApiPropertyOptional({ description: 'Filter by section ID' })
  @IsOptional()
  sectionId?: number;

  @ApiPropertyOptional({ description: 'Filter by session ID' })
  @IsOptional()
  sessionId?: number;

  @ApiPropertyOptional({ description: 'Filter by status', enum: ['ACTIVE','PROMOTED','COMPLETED','LEFT'] })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by gender', enum: ['MALE','FEMALE','OTHER'] })
  @IsOptional()
  @IsString()
  gender?: string;

   @ApiPropertyOptional({
     description: 'Page number (starting from 1)',
     example: 1,
   })
   @IsOptional()
   @IsNumberString()
   page?: number;
 
   @ApiPropertyOptional({
     description: 'Number of items per page',
     example: 10,
   })
   @IsOptional()
   @IsNumberString()
   limit?: number;
}
