import { Module } from '@nestjs/common';
import { FeeStructureModule } from './fee-structure/fee-structure.module';
import { StudentFeeModule } from './student-fee/student-fee.module';
import { FeePaymentModule } from './fee-payment/fee-payment.module';

@Module({
  imports: [FeeStructureModule, StudentFeeModule, FeePaymentModule]
})
export class FeesModule {}
