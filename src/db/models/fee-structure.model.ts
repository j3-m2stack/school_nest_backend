import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ClassMst } from './class.model';
import { AcademicSession } from './academic-session.model';

@Table({ tableName: 'fee_structures', timestamps: true })
export class FeeStructure extends Model<FeeStructure> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => ClassMst)
  @Column({ type: DataType.INTEGER, allowNull: false })
  classId: number;

  @BelongsTo(() => ClassMst)
  class: ClassMst;

  @ForeignKey(() => AcademicSession)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sessionId: number;

  @BelongsTo(() => AcademicSession)
  session: AcademicSession;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  admissionFee: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  tuitionFee: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  examFee: number;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  transportFee: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalAmount: number;

  @Column({
    type: DataType.ENUM('MONTHLY', 'QUARTERLY', 'YEARLY'),
    defaultValue: 'YEARLY',
  })
  termType: string;
}
