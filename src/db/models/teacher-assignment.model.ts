import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ClassMst } from './class.model';
import { Section } from './section.model';
import { Subject } from './subject.model';
import { User } from './user.model';

@Table({ tableName: 'teacher_assignments', timestamps: true })
export class TeacherAssignment extends Model<TeacherAssignment> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teacherId: number;

  @BelongsTo(() => User)
  teacher: User;

  @ForeignKey(() => ClassMst)
  @Column({ type: DataType.INTEGER, allowNull: false })
  classId: number;

  @BelongsTo(() => ClassMst)
  class: ClassMst;

  @ForeignKey(() => Section)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sectionId: number;

  @BelongsTo(() => Section)
  section: Section;

  @ForeignKey(() => Subject)
  @Column({ type: DataType.INTEGER, allowNull: false })
  subjectId: number;

  @BelongsTo(() => Subject)
  subject: Subject;
}
