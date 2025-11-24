import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { UserProfile } from './user-profile.model';
import { AdminUserRole, AdminUserRoleEnum } from 'src/common/types/admin-user-role.enum';



@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.ENUM(...AdminUserRoleEnum), allowNull: false, defaultValue: AdminUserRole.STAFF })
  role: AdminUserRole;

  @HasOne(() => UserProfile)
  profile: UserProfile;
}
