import { Module } from '@nestjs/common';
import { IdCardService } from './id-card.service';
import { IdCardController } from './id-card.controller';
import { StudentService } from 'src/modules/staff/student/student.service';

@Module({
  controllers: [IdCardController],
  providers: [IdCardService, StudentService],
})
export class IdCardModule {}
