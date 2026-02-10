import { Module } from '@nestjs/common';
import { ClassManagementModule } from './class-management/class-management.module';
import { IdCardModule } from './id-card/id-card.module';
import { PublicModule } from './public/public.module';
import { ResultPdfModule } from './result-pdf/result-pdf.module';

@Module({
  imports: [ClassManagementModule, IdCardModule, PublicModule, ResultPdfModule],
})
export class CommonModule {}
