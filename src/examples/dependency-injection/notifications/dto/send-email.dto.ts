import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
