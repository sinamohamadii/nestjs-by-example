import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsStrongPassword } from '../decorators/is-strong-password.decorator';
import { AddressDto } from './address.dto';
import { ProfileDto } from './profile.dto';
import { Type } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class RegisterUserDto {
  @IsString()
  name!: string;

  @IsEmail({}, { message: 'Please enter a valid email address dear user.' })
  email!: string;

  /* Password must be a string with a minimum length of 8 characters & at least 
   one uppercase letter, one lowercase letter, one number, and one special character. */
  @IsStrongPassword({
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  @IsString()
  @MinLength(8)
  password!: string;

  // Age must be a number between 18 and 100
  @IsNumber()
  @Min(18)
  @Max(100)
  age!: number;

  // Passing down the nested Dtos
  @ValidateNested()
  @Type(() => ProfileDto)
  profile!: ProfileDto;

  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;

  // Skills must be an array of strings
  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  // Role must be one of the values defined in the UserRole enum. If not passed, it defaults to 'user'.
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER; // Default role is 'user'
}
