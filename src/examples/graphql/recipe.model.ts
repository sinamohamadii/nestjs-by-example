import { ObjectType, Field, Int } from '@nestjs/graphql';

// @ObjectType describes a type that GraphQL can return.
// Each @Field becomes a field clients can ask for.
// In "code-first" GraphQL, the schema is generated from these classes.
@ObjectType()
export class Recipe {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  description!: string;
}
