import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { StaffModule } from './modules/staff/staff.module';
import { CommonModule } from './modules/common/common.module';
import { StudentMarksModule } from './modules/student-marks/student-marks.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [DatabaseModule, AdminModule, AuthModule, StaffModule, CommonModule,StudentMarksModule,AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
