import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {
    this.subscribe = this.store.select('recipe').pipe(
      map((recipe) => {
        return recipe.recipes;
      })
    ).subscribe(recipes => {
      this.recipes = recipes;
    });
  }


  addNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
