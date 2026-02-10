import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'subjects', timestamps: true })
export class Subject extends Model<Subject> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING })
  code: string;
}

