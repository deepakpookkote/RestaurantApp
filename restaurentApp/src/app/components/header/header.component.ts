import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, pipe } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../features/recipe/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  userInfo: User;
  isAuthenticated = false;

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(map(authState => {
      return authState.user;
    })).subscribe((userData => {
      this.userInfo = userData;
      this.isAuthenticated = !!userData;
    }));
  }

  onSaveData() {
    // this.dataService.storeRecipe();
    this.store.dispatch(new RecipeActions.StoreRecipe());
  }

  loadRecipes() {
    // this.dataService.loadRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipe());
  }

  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

}
