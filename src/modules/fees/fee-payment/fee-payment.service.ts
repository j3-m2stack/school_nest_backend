import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentFee } from 'src/db/models/student-fee.model';
import { FeePayment } from 'src/db/models/fee-payment.model';

@Injectable()
export class FeePaymentService {
  async payFee(dto: any) {
    const studentFee = await StudentFee.findByPk(dto.studentFeeId);

    if (!studentFee) {
      throw new NotFoundException('Student fee record not found');
    }

    // update paid amount
    studentFee.paidAmount =
      Number(studentFee.paidAmount) + Number(dto.amountPaid);

    studentFee.remainingAmount =
      Number(studentFee.totalAmount) - Number(studentFee.paidAmount);

    studentFee.status =
      studentFee.remainingAmount <= 0 ? 'PAID' : 'PARTIAL';

    await studentFee.save();

    const payment = await FeePayment.create(dto);

    return {
      statusCode: 201,
      message: 'Fee payment successful',
      data: payment,
    };
  }
}
