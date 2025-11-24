import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ClassModel } from './class.model';

@Table({ tableName: 'sections', timestamps: true })
export class Section extends Model<Section> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => ClassModel)
  @Column({ type: DataType.INTEGER })
  classId: number;

  @BelongsTo(() => ClassModel)
  class: ClassModel;
}
