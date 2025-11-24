import { Module } from '@nestjs/common';
import { ClassManagementModule } from './class-management/class-management.module';
import { IdCardModule } from './id-card/id-card.module';

@Module({
  imports: [ClassManagementModule, IdCardModule],
})
export class CommonModule {}
