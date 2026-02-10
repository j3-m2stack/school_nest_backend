import { Module } from '@nestjs/common';
import { ResultPdfService } from './result-pdf.service';
import { ResultPdfController } from './result-pdf.controller';
import { StudentMarksService } from 'src/modules/student-marks/student-marks.service';
import { StudentService } from 'src/modules/staff/student/student.service';


@Module({
  controllers: [ResultPdfController],
  providers: [ResultPdfService, StudentMarksService, StudentService],
})
export class ResultPdfModule {}
