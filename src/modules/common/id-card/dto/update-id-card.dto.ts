import { PartialType } from '@nestjs/mapped-types';
import { CreateIdCardDto } from './create-id-card.dto';

export class UpdateIdCardDto extends PartialType(CreateIdCardDto) {}
