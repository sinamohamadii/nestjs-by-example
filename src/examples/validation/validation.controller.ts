import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

// Adding validation pipe to the controller to validate incoming requests
@UsePipes(
  new ValidationPipe({
    whitelist: true, // Strip properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }),
)
@Controller('validation')
export class ValidationController {
  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return registerUserDto;
  }
}
