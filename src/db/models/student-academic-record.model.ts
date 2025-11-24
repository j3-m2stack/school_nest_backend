import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AcademicSession } from './academic-session.model';
import { ClassMst } from './class.model';
import { Section } from './section.model';
import { Student } from './student.model';

@Table({ tableName: 'student_academic_records', timestamps: true })
export class StudentAcademicRecord extends Model<StudentAcademicRecord> {
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ForeignKey(() => AcademicSession)
  @Column({ type: DataType.INTEGER })
  sessionId: number;

  @BelongsTo(() => AcademicSession)
  session: AcademicSession;

  @ForeignKey(() => ClassMst)
  @Column({ type: DataType.INTEGER })
  classId: number;

  @BelongsTo(() => ClassMst)
  class: ClassMst;

  @ForeignKey(() => Section)
  @Column({ type: DataType.INTEGER })
  sectionId: number;

  @BelongsTo(() => Section)
  section: Section;

  @Column({ type: DataType.STRING })
  rollNumber: string;

  @Column({ type: DataType.JSON })
  marks: any;

  @Column({
    type: DataType.ENUM('active', 'promoted', 'completed', 'left'),
    defaultValue: 'active',
  })
  status: string;
}
