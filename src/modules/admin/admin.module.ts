import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [UserModule, SessionsModule],
})
export class AdminModule {}
