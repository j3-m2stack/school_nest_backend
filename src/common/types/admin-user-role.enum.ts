import { ApiProperty } from '@nestjs/swagger';

export enum AdminUserRole {
  STAFF = 'STAFF',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export const AdminUserRoleEnum = Object.values(AdminUserRole);
