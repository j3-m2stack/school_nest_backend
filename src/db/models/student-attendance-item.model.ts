import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { StudentAttendance } from './student-attendance.model';
import { Student } from './student.model';

@Table({ tableName: 'student_attendance_items', timestamps: false })
export class StudentAttendanceItem extends Model<StudentAttendanceItem> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => StudentAttendance)
  @Column({ type: DataType.INTEGER })
  attendanceId: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;

  @Column({
    type: DataType.ENUM('PRESENT', 'ABSENT', 'LATE'),
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => StudentAttendance)
  attendance: StudentAttendance;
}
