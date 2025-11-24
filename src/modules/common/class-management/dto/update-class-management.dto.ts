import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class-management.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
