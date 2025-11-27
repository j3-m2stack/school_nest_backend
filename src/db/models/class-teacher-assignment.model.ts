import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Section } from './section.model';
import { AcademicSession } from './academic-session.model';

@Table({ tableName: 'class_teacher_assignments', timestamps: true })
export class ClassTeacherAssignment extends Model<ClassTeacherAssignment> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number; // <-- Primary key added

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teacherId: number;

  @BelongsTo(() => User)
  teacher: User;

  @ForeignKey(() => Section)
  @Column({ type: DataType.INTEGER, allowNull: true })
  sectionId: number;

  @BelongsTo(() => Section)
  section: Section;

  @ForeignKey(() => AcademicSession)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sessionId: number;

  @BelongsTo(() => AcademicSession)
  session: AcademicSession;
}
