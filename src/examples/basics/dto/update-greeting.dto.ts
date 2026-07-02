import { IsNumber, IsString } from 'class-validator';

// This dto does not do anything until we add the validation pipe in the main.ts file.
export class UpdateGreetingDto {
  // Optional — allows updating the greeting id if provided in the body
  @IsNumber()
  id?: number;

  @IsString()
  name?: string;

  @IsString()
  message?: string;
}
