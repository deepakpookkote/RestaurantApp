import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeInfo: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeInfo = this.recipeService.getRecipeById(this.id);
    });
  }

  onAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeInfo.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    //alternate way
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
