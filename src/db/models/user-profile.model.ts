import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'user_profiles', timestamps: true })
export class UserProfile extends Model<UserProfile> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.DATE })
  dob: Date;

  @Column({ type: DataType.ENUM('male','female','other') })
  gender: string;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.STRING })
  aadharNumber: string;

  @Column({ type: DataType.TEXT })
  address: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  qualification: string;

  @Column({ type: DataType.DATE })
  joiningDate: Date;

  @Column({ type: DataType.STRING })
  designation: string;
}
