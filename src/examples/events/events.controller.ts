import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { IsEmail } from 'class-validator';
import { UsersService } from './users.service';

class RegisterDto {
  @IsEmail()
  email!: string;
}

// All routes here live under /events
@Controller('events')
export class EventsController {
  constructor(private readonly usersService: UsersService) {}

  // Try: POST /events/register  { "email": "jane@example.com" }
  // The response returns immediately; watch the server logs for the listener.
  @Post('register')
  register(@Body(new ValidationPipe()) dto: RegisterDto) {
    return this.usersService.register(dto.email);
  }
}
