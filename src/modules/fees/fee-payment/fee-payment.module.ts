import { Module } from '@nestjs/common';
import { FeePaymentService } from './fee-payment.service';
import { FeePaymentController } from './fee-payment.controller';

@Module({
  controllers: [FeePaymentController],
  providers: [FeePaymentService],
})
export class FeePaymentModule {}
