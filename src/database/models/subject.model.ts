import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ClassModel } from './class.model';

@Table({ tableName: 'subjects', timestamps: true })
export class Subject extends Model<Subject> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  code: string;

  @ForeignKey(() => ClassModel)
  @Column({ type: DataType.INTEGER })
  classId: number;

  @BelongsTo(() => ClassModel)
  class: ClassModel;
}
