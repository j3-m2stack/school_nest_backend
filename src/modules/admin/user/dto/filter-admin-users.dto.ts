import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterAdminUsersDto extends BasePaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by role',
    example: 'staff',
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({
    description: 'Search by email',
    example: 'john',
  })
  @IsOptional()
  search?: string;
}
