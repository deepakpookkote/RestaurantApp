import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { PostService } from 'src/app/shared/post.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]>{
    constructor(private dataService: PostService, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.dataService.loadRecipes();
        } else {
            return recipes;
        }
    }
}
