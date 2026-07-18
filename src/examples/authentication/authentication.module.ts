import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from './users.service';

@Module({
  imports: [
    // Configure JWT signing once, here, for the whole module.
    JwtModule.register({
      // In a real app the secret comes from configuration/environment, never hard-coded.
      secret: 'super-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthService, AuthGuard, UsersService],
})
export class AuthenticationModule {}
