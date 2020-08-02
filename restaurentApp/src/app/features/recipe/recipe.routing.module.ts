import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { AuthGuard } from 'src/app/auth/auth-gaurd';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesResolver } from './recipe-resolver.service';



const routes: Routes = [
    {
        path: '', component: RecipeComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: RecipeStartComponent },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolver] },
          { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] },
        ]
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
