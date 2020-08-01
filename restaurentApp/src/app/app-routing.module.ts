import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { RecipeComponent } from './features/recipe/recipe.component';
// import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
// import { AuthGuardService } from './shared/auth-guard.service';
// import { AuthService } from './shared/auth.service';
// import { RecipeStartComponent } from './features/recipe/recipe-start/recipe-start.component';
// import { RecipeDetailsComponent } from './features/recipe/recipe-details/recipe-details.component';
// import { RecipeEditComponent } from './features/recipe/recipe-edit/recipe-edit.component';
// import { RecipesResolver } from './features/recipe/recipe-resolver.service';
// import { AuthComponent } from './auth/auth.component';
// import { AuthGaurd } from './auth/auth-gaurd';
import { CreatePostComponent } from './features/create-post/create-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'posts', component: CreatePostComponent },
  { path: 'recipes', loadChildren: () => import('./features/recipe/recipes.module').then(m => m.RecipesModule)},
  { path: 'shopping-list', loadChildren: () => import('./features/shopping-list/shopping.module').then(m => m.ShoppingModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
