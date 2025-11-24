import { SetMetadata } from '@nestjs/common';
import { AdminUserRole } from '../types/admin-user-role.enum';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: AdminUserRole[]) => SetMetadata(ROLES_KEY, roles);