import { Injectable } from '@nestjs/common';
console.log('a', process.env);
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
