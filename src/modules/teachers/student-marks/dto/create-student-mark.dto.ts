import { IsEnum, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ExamType } from 'src/common/types/exam-type.enum';

class SubjectMarksDto {
  @ApiProperty({ description: 'ID of the subject', example: 1 })
  @IsNumber()
  subjectId: number;

  @ApiProperty({ description: 'Marks obtained in this subject', example: 85 })
  @IsNumber()
  @Min(0)
  marksObtained: number;

  @ApiProperty({ description: 'Total marks for this subject', example: 100 })
  @IsNumber()
  @Min(0)
  totalMarks: number;
}

export class CreateStudentMarksDto {
  @ApiProperty({ description: 'ID of the student academic record', example: 123 })
  @IsNumber()
  studentAcademicRecordId: number;

  @ApiProperty({ enum: ExamType, description: 'Type of exam', example: ExamType.QUARTERLY })
  @IsEnum(ExamType)
  examType: ExamType;

  @ApiProperty({ type: [SubjectMarksDto], description: 'List of subjects with marks' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectMarksDto)
  subjects: SubjectMarksDto[];
}
