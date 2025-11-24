import { ApiProperty } from '@nestjs/swagger';

export enum AdminUserRole {
  STAFF = 'staff',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export const AdminUserRoleEnum = Object.values(AdminUserRole);
