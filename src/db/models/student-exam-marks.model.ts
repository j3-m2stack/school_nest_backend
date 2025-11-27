import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { StudentAcademicRecord } from './student-academic-record.model';
import { ExamType } from 'src/common/types/exam-type.enum';
import { User } from './user.model';

@Table({ tableName: 'student_exam_marks', timestamps: true })
export class StudentExamMarks extends Model<StudentExamMarks> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => StudentAcademicRecord)
  @Column({ type: DataType.INTEGER, allowNull: false })
  studentAcademicRecordId: number;

  @BelongsTo(() => StudentAcademicRecord)
  academicRecord: StudentAcademicRecord;

  @Column({ type: DataType.ENUM(...Object.values(ExamType)), allowNull: false })
  examType: ExamType;

  @Column({ type: DataType.JSON, allowNull: false })
  marks: any; // [{ subjectId, subjectName, marksObtained, totalMarks }]

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teacherId: number;

  @BelongsTo(() => User)
  teacher: User;
}
