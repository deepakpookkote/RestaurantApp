import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

}
