import { IsNumber } from 'class-validator';

export class AssignSubjectToClassDto {
  @IsNumber()
  classId: number;

  @IsNumber()
  subjectId: number;
}
