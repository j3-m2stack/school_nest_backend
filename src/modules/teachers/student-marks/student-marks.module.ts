import { Module } from '@nestjs/common';
import { StudentMarksService } from './student-marks.service';
import { StudentMarksController } from './student-marks.controller';

@Module({
  controllers: [StudentMarksController],
  providers: [StudentMarksService],
})
export class StudentMarksModule {}
