import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
// import { RecipeComponent } from './features/recipe/recipe.component';
// import { RecipeListComponent } from './features/recipe/recipe-list/recipe-list.component';
// import { RecipeDetailsComponent } from './features/recipe/recipe-details/recipe-details.component';
// import { RecipeItemComponent } from './features/recipe/recipe-list/recipe-item/recipe-item.component';
// import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './features/shopping-list/shopping-edit/shopping-edit.component';
// import { DropdownDirective } from './shared/directives/dropdown.directive';
// import { RecipeStartComponent } from './features/recipe/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './features/recipe/recipe-edit/recipe-edit.component';
import { CreatePostComponent } from './features/create-post/create-post.component';
import { AuthInterceptor } from './shared/auth-interceptor';
// import { LoginInterceptor } from './shared/logging-interceptor';
// import { AuthComponent } from './auth/auth.component';
// import { LodingSpinnerComponent } from './shared/loding-spinner/loding-spinner.component';
// import { AlertComponent } from './shared/alert/alert.component';
// import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';
// import { RecipesModule } from './features/recipe/recipes.module';
// import { ShoppingModule } from './features/shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  // exports: [
  //   DropdownDirective
  // ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule { }
