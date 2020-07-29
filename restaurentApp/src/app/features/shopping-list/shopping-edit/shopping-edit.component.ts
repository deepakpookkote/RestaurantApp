import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;

  editSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.editSubscription = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new shoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  resetForm() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  removeItem() {
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.resetForm();

  }

}
