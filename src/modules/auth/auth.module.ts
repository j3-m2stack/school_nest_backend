import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';


@Module({
imports: [
PassportModule,
JwtModule.register({
secret: process.env.JWT_SECRET || 'secret123',
signOptions: { expiresIn: '2d' },
}),
],
controllers: [AuthController],
providers: [AuthService, JwtStrategy],
})
export class AuthModule {}