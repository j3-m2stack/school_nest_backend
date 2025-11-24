import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Student } from './student.model';

@Table({ tableName: 'parents', timestamps: true })
export class Parent extends Model<Parent> {
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  relation: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  occupation: string;

  @Column({ type: DataType.TEXT })
  address: string;
}
