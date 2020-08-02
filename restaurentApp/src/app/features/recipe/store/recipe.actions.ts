import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipe] Set Recipe';
export const FETCH_RECIPES = '[Recipe] Fetch Recipes';
export const ADD_RECIPES = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipe] Store Recipe';


export class SetRecipe implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){}
}

export class FetchRecipe implements Action {
    readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPES;
    constructor(public payload: Recipe){}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, newRecipe: Recipe}){}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number){}
}

export class StoreRecipe implements Action {
    readonly type = STORE_RECIPES;
}
export type RecipeActions = SetRecipe | FetchRecipe | AddRecipe | UpdateRecipe | DeleteRecipe | StoreRecipe;
