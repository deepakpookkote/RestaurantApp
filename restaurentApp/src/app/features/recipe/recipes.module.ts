import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipe.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { DropdownDirective } from 'src/app/shared/directives/dropdown.directive';

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
        // DropdownDirective
    ],
    exports: [
        // RecipeComponent,
        // RecipeListComponent,
        // RecipeDetailsComponent,
        // RecipeItemComponent,
        // RecipeStartComponent,
        // RecipeEditComponent,
        // DropdownDirective
    ]
})
export class RecipesModule {

}
