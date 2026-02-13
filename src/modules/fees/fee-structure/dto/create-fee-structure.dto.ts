import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export enum TermType {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export class CreateFeeStructureDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @ApiProperty({ example: 5000, required: false })
  @IsNumber()
  @IsOptional()
  admissionFee?: number;

  @ApiProperty({ example: 20000, required: false })
  @IsNumber()
  @IsOptional()
  tuitionFee?: number;

  @ApiProperty({ example: 3000, required: false })
  @IsNumber()
  @IsOptional()
  examFee?: number;

  @ApiProperty({ example: 4000, required: false })
  @IsNumber()
  @IsOptional()
  transportFee?: number;

  @ApiProperty({ example: 32000 })
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ enum: TermType, example: TermType.YEARLY })
  @IsEnum(TermType)
  termType: TermType;
}
