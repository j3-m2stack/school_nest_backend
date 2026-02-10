import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { StudentAttendanceItem } from './student-attendance-item.model';

@Table({ tableName: 'student_attendances', timestamps: true })
export class StudentAttendance extends Model<StudentAttendance> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  classId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  sectionId: number;

  @HasMany(() => StudentAttendanceItem)
  items: StudentAttendanceItem[];
}
