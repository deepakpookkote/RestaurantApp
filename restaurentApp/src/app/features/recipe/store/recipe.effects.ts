import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import * as fromAppState from '../../../store/app.reducer';
import { Store } from '@ngrx/store';

const domain = 'https://ng-complete-guide-68acf.firebaseio.com';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(fetchAction => {
            return this.http.get<Recipe[]>(`${domain}/recipes.json`);
        }), map((response) => {
            return response.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }), map(recipes => {
            return new RecipeActions.SetRecipe(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        switchMap(([actionData, recipeState]) => {
            return this.http.put(`${domain}/recipes.json`, recipeState.recipes);
        })
    );
    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromAppState.AppState>) { }
}
