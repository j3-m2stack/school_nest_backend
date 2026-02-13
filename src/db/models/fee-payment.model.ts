import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { StudentFee } from './student-fee.model';

@Table({ tableName: 'fee_payments', timestamps: true })
export class FeePayment extends Model<FeePayment> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => StudentFee)
  @Column({ type: DataType.INTEGER })
  studentFeeId: number;

  @BelongsTo(() => StudentFee)
  studentFee: StudentFee;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amountPaid: number;

  @Column({
    type: DataType.ENUM('CASH', 'ONLINE', 'CHEQUE'),
    defaultValue: 'CASH',
  })
  paymentMethod: string;

  @Column({
    type: DataType.ENUM('FULL', 'HALF', 'QUARTER', 'CUSTOM'),
    defaultValue: 'CUSTOM',
  })
  paymentType: string;

  @Column({ type: DataType.STRING })
  term: string; // Q1, Q2 etc

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  paymentDate: Date;
}
