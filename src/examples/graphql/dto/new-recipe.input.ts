import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

// @InputType describes the arguments a mutation accepts.
// It's the GraphQL equivalent of a DTO.
@InputType()
export class NewRecipeInput {
  @Field()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsNotEmpty()
  description!: string;
}
