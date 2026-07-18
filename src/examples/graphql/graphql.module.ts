import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    // "Code-first": the GraphQL schema is generated from our classes.
    // autoSchemaFile: true keeps the generated schema in memory.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // Serve the Apollo Sandbox playground at /graphql so you can try queries.
      playground: false,
      graphiql: true,
    }),
  ],
  providers: [RecipesResolver, RecipesService],
})
export class GraphqlModule {}
