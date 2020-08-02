import * as fromShoppingList from '../features/shopping-list/store/shopping-list.reducer';
import * as fromAuthList from '../auth/store/auth.reducer';
import * as fromRecipeList from '../features/recipe/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuthList.State;
    recipe: fromRecipeList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuthList.authReducer,
    recipe: fromRecipeList.recipeReducer
};
