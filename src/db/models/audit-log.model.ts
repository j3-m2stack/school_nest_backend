import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'audit_logs', timestamps: true })
export class AuditLog extends Model<AuditLog> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING })
  action: string;

  @Column({ type: DataType.JSON })
  meta: any;
}
