import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentMarksDto } from './create-student-mark.dto';

export class UpdateStudentMarkDto extends PartialType(CreateStudentMarksDto) {}
