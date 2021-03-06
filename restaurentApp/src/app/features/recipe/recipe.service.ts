import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
    // new Recipe(
    //     'Cheese Chicken Sandwich',
    //     'Sandwich with 2 slices and cheese ',
    //     'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
    //     [
    //       new Ingredient('Meat', 1),
    //       new Ingredient('French Fries', 20)
    //     ]
    //     ),
    // new Recipe(
    //   'Big Fat Burger',
    //   'Tasty burger with Meat and cheese',
    //   'data:image/jpeg;base64,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',
    //   [
    //     new Ingredient('Buns', 2),
    //     new Ingredient('Meat', 20)
    //   ]
    //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients);
  }

  getRecipeById(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
