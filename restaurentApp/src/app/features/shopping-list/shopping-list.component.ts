import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple', 10),
  //   new Ingredient('Orange', 10),
  //   new Ingredient('Grapes', 10),
  // ];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }

  removeItem(item: any) {
    this.ingredients.splice(item, 1);
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}
