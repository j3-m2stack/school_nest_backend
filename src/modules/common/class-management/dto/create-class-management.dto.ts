import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class SectionDto {
  @ApiProperty({ example: "A" })
  @IsString()
  name: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  classTeacherId?: number;
}

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: [SectionDto],
    description: 'List of sections with optional classTeacherId',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];

    @ApiProperty({
    type: [Number],
    description: 'List of subject IDs for this class',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  subjectIds: number[];
}
