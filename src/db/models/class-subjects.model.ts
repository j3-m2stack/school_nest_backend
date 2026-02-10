import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ClassMst } from './class.model';
import { Subject } from './subject.model';

@Table({ tableName: 'class_subjects', timestamps: true })
export class ClassSubject extends Model<ClassSubject> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;


  @ForeignKey(() => ClassMst)
  @Column({ type: DataType.INTEGER, allowNull: false })
  classId: number;

  @ForeignKey(() => Subject)
  @Column({ type: DataType.INTEGER, allowNull: false })
  subjectId: number;

  @BelongsTo(() => ClassMst)
  class: ClassMst;

  @BelongsTo(() => Subject)
  subject: Subject;
}
