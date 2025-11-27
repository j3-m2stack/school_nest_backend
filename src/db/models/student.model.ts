import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Parent } from './parent.model';
import { StudentAcademicRecord } from './student-academic-record.model';

@Table({ tableName: 'students', timestamps: true })
export class Student extends Model<Student> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.DATE })
  dob: Date;

  @Column({ type: DataType.ENUM('MALE','FEMALE','OTHER') })
  gender: string;

  @Column({ type: DataType.STRING })
  aadharNumber: string;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.DATE })
  admissionDate: Date;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.TEXT })
  address: string;

  @Column({ type: DataType.ENUM('ACTIVE','INACTIVE') })
  status: string;

  @HasMany(() => Parent)
  parents: Parent[];

  @HasMany(() => StudentAcademicRecord)
  records: StudentAcademicRecord[];
}
