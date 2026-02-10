import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'teacher_attendances', timestamps: true })
export class TeacherAttendance extends Model<TeacherAttendance> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  teacherId: number; // userId with role TEACHER

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: string;

  @Column({
    type: DataType.ENUM('PRESENT', 'ABSENT', 'LEAVE'),
    allowNull: false,
  })
  status: string;
}
