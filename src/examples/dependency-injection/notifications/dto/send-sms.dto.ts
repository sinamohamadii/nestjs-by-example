import { IsString, IsNotEmpty } from 'class-validator';

export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
