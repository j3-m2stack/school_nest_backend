import { Module } from '@nestjs/common';
import { ClassManagementModule } from './class-management/class-management.module';
import { IdCardModule } from './id-card/id-card.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [ClassManagementModule, IdCardModule, PublicModule],
})
export class CommonModule {}
