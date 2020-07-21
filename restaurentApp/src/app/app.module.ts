import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeComponent } from './features/recipe/recipe.component';
import { RecipeListComponent } from './features/recipe/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './features/recipe/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './features/recipe/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './features/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { RecipeStartComponent } from './features/recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './features/recipe/recipe-edit/recipe-edit.component';
import { ShortenPipe } from './features/shopping-list/shorten.pipe';
import { FilterPipe } from './features/shopping-list/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
