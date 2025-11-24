import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'academic_sessions', timestamps: true })
export class AcademicSession extends Model<AcademicSession> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.DATE })
  startDate: Date;

  @Column({ type: DataType.DATE })
  endDate: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isCurrent: boolean;
}
