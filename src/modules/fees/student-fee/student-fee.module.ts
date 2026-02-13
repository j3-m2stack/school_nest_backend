import { Module } from '@nestjs/common';
import { StudentFeeService } from './student-fee.service';
import { StudentFeeController } from './student-fee.controller';

@Module({
  controllers: [StudentFeeController],
  providers: [StudentFeeService],
})
export class StudentFeeModule {}
