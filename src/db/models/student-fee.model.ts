import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Student } from './student.model';
import { FeeStructure } from './fee-structure.model';
import { FeePayment } from './fee-payment.model';

@Table({ tableName: 'student_fees', timestamps: true })
export class StudentFee extends Model<StudentFee> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ForeignKey(() => FeeStructure)
  @Column({ type: DataType.INTEGER })
  feeStructureId: number;

  @BelongsTo(() => FeeStructure)
  feeStructure: FeeStructure;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalAmount: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  paidAmount: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  remainingAmount: number;

  @Column({
    type: DataType.ENUM('PAID', 'PARTIAL', 'PENDING'),
    defaultValue: 'PENDING',
  })
  status: string;

  @HasMany(() => FeePayment)
  payments: FeePayment[];
}
