import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

// All routes here live under /auth
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  // Step 1 — Log in with a username and password to receive a JWT.
  // Try: POST /auth/login  { "username": "john", "password": "password123" }
  @Post('login')
  login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  // Step 2 — A protected route. AuthGuard rejects requests without a valid token.
  // Try: GET /auth/profile  with header  Authorization: Bearer <access_token>
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: Request) {
    // AuthGuard attached the decoded token payload to the request.
    return {
      message: 'This is protected data.',
      user: (req as Request & { user: unknown }).user,
    };
  }
}
