import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { FeePayment } from './fee-payment.model';

@Table({ tableName: 'fee_receipts', timestamps: true })
export class FeeReceipt extends Model<FeeReceipt> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER })
  paymentId: number;

  @Column({ type: DataType.STRING, unique: true })
  receiptNumber: string;
}
