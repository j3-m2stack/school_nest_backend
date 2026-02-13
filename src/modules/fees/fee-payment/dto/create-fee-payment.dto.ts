import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';

export enum PaymentMethod {
  CASH = 'CASH',
  ONLINE = 'ONLINE',
  CHEQUE = 'CHEQUE',
}

export enum PaymentType {
  FULL = 'FULL',
  HALF = 'HALF',
  QUARTER = 'QUARTER',
  CUSTOM = 'CUSTOM',
}

export class CreateFeePaymentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  studentFeeId: number;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  amountPaid: number;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CASH })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    enum: PaymentType,
    example: PaymentType.CUSTOM,
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({
    example: 'Q1',
    required: false,
    description: 'Term like Q1, Q2 etc',
  })
  @IsString()
  @IsOptional()
  term?: string;
}
