import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { StaffModule } from './modules/staff/staff.module';
import { CommonModule } from './modules/common/common.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
  imports: [DatabaseModule, AdminModule, AuthModule, StaffModule, CommonModule,TeachersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
