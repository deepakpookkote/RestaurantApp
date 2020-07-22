import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './features/recipe/recipe.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { RecipeStartComponent } from './features/recipe/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './features/recipe/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './features/recipe/recipe-edit/recipe-edit.component';
import { CreatePostComponent } from './features/create-post/create-post.component';

const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: '/recipes'},
  { path: 'recipes', component: RecipeComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailsComponent},
    {path: ':id/edit', component: RecipeEditComponent},
  ]  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'posts', component: CreatePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
