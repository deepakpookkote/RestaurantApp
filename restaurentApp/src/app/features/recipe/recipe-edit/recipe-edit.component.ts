import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipeAction from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  storeSubscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private navigator: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    /** My Approach to get the Id  */

    // this.router.params.pipe(
    //   map(params => {
    //     return +params['id'];
    //   }),
    //   // switchMap(id => {
    //   //   this.id = id;
    //   //   return this.store.select('recipe');
    //   // })
    // ).subscribe((id) => {
    //   this.id = id;
    //   this.editMode = id != null;
    //   this.initForm();
    // });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSubscription = this.store.select('recipe').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      ).subscribe((recipe) => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      });
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeAction.UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new RecipeAction.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.navigator.navigate(['../'], { relativeTo: this.router });
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
