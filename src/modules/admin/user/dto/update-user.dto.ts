import { PartialType } from '@nestjs/swagger';
import { CreateAdminUserDto } from './create-user.dto';

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {}
