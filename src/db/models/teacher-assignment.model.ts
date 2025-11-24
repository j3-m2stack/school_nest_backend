import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ClassMst } from './class.model';
import { Section } from './section.model';
import { Subject } from './subject.model';
import { User } from './user.model';

@Table({ tableName: 'teacher_assignments', timestamps: true })
export class TeacherAssignment extends Model<TeacherAssignment> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  teacherId: number;

  @ForeignKey(() => ClassMst)
  @Column({ type: DataType.INTEGER })
  classId: number;

  @ForeignKey(() => Section)
  @Column({ type: DataType.INTEGER })
  sectionId: number;

  @ForeignKey(() => Subject)
  @Column({ type: DataType.INTEGER })
  subjectId: number;
}
