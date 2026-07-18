import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './recipe.model';
import { NewRecipeInput } from './dto/new-recipe.input';

// Plain in-memory storage — the focus of this chapter is GraphQL, not the data.
@Injectable()
export class RecipesService {
  private readonly recipes: Recipe[] = [
    { id: 1, title: 'Pancakes', description: 'Fluffy breakfast pancakes' },
  ];

  findAll(): Recipe[] {
    return this.recipes;
  }

  findOne(id: number): Recipe {
    const recipe = this.recipes.find((r) => r.id === id);
    if (!recipe) {
      throw new NotFoundException(`Recipe ${id} not found`);
    }
    return recipe;
  }

  create(input: NewRecipeInput): Recipe {
    const recipe: Recipe = { id: this.recipes.length + 1, ...input };
    this.recipes.push(recipe);
    return recipe;
  }
}
