import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ` <h1 style="color: #ff0a0a; text-align: center;">Welcome to the School Management System API</h1> `;
  }
}
