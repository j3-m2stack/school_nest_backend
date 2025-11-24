import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Section } from './section.model';

@Table({ tableName: 'classes', timestamps: true })
export class ClassMst extends Model<ClassMst> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @HasMany(() => Section)
  sections: Section[];
}
