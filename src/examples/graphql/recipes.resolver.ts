import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { NewRecipeInput } from './dto/new-recipe.input';

// A Resolver is to GraphQL what a Controller is to REST:
// it maps incoming queries/mutations to service methods.
@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  // A Query reads data.  GraphQL:  { recipes { id title } }
  @Query(() => [Recipe], { name: 'recipes' })
  findAll() {
    return this.recipesService.findAll();
  }

  // A Query with an argument.  GraphQL:  { recipe(id: 1) { title } }
  @Query(() => Recipe, { name: 'recipe' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.recipesService.findOne(id);
  }

  // A Mutation changes data.
  // GraphQL:  mutation { addRecipe(input: { title: "...", description: "..." }) { id } }
  @Mutation(() => Recipe)
  addRecipe(@Args('input') input: NewRecipeInput) {
    return this.recipesService.create(input);
  }
}
