import { Module } from '@nestjs/common';
import { StudentMarksModule } from './student-marks/student-marks.module';

@Module({
    imports: [StudentMarksModule],
})
export class TeachersModule {}
