import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  // private recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // this.recipeSubscription = this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }

  ngOnDestroy(){
    // this.recipeSubscription.unsubscribe();
  }

}
