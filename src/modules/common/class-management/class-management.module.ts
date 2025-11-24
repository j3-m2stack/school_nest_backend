import { Module } from '@nestjs/common';
import { ClassManagementService } from './class-management.service';
import { ClassManagementController } from './class-management.controller';

@Module({
  controllers: [ClassManagementController],
  providers: [ClassManagementService],
})
export class ClassManagementModule {}
