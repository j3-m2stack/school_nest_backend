export class CreateSessionDto {}
import { IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAcademicSessionDto {
  @ApiProperty({ description: 'Name of the session, e.g., 2025-2026' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Start date of the session',
    example: '2025-06-01',
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the session',
    example: '2026-05-31',
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'Mark if this is the current session',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;
}
