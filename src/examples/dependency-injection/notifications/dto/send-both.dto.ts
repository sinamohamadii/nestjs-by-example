import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SendBothDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
