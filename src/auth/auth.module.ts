import { Module } from '@nestjs/common';
import { UserModules } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModules],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModules {}
