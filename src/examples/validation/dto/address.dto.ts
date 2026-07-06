import { IsNumber, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  country!: string;

  @IsString()
  city!: string;

  @IsNumber()
  zipCode!: number;
}
