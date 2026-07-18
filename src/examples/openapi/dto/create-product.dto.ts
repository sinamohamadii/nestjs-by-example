import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

// @ApiProperty describes each field so it shows up in the generated docs,
// including its type, an example, and a short description.
export class CreateProductDto {
  @ApiProperty({ example: 'Mechanical Keyboard', description: 'The product name' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 120, description: 'Price in USD', minimum: 0 })
  @IsNumber()
  @Min(0)
  price!: number;
}
