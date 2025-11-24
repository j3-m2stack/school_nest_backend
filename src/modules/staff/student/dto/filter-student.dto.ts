import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class FilterStudentDto extends BasePaginationDto {
  @ApiPropertyOptional({ example: 'Rohit' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'A' })
  @IsOptional()
  @IsString()
  grade?: string;
}
