import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum FeeStatus {
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  PENDING = 'PENDING',
}

export class CreateStudentFeeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  feeStructureId: number;

  @ApiProperty({ example: 32000 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @ApiProperty({ example: 32000 })
  @IsNumber()
  remainingAmount: number;

  @ApiProperty({ enum: FeeStatus, example: FeeStatus.PENDING })
  @IsEnum(FeeStatus)
  status: FeeStatus;
}
