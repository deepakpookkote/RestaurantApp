import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;
  today: Date = new Date();
  myName = 'Deepak Pookkote';
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple', 10),
  //   new Ingredient('Orange', 10),
  //   new Ingredient('Grapes', 10),
  // ];
  users = [
    {name: 'Deepak', age: '26'},
    {name: 'Raj', age: '24'}
  ];

  filteredStatus = '';
  userName = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Deepak');
    }, 2000);
  });

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientSubscription = this.shoppingService.ingredientChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }

  removeItem(item: any) {
    this.ingredients.splice(item, 1);
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingService.initiateEditing.next(index);
  }

  addUser() {
    this.users.push({
      name: 'vipin',
      age: '33'
    });
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}
