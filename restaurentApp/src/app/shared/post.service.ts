import { Injectable } from '@angular/core';
import { Post } from '../features/create-post/post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from '../features/recipe/recipe.service';
import { Recipe } from '../features/recipe/recipe.model';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  domain = 'https://ng-complete-guide-68acf.firebaseio.com';


  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: LoginService) { }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(`${this.domain}/recipes.json`, recipes).subscribe((res) => {
      console.log(res);
    });
  }

  loadRecipes() {

    return this.http.get<Recipe[]>(`${this.domain}/recipes.json`).pipe(map((response) => {
      return response.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
      });
    }), tap(response => {
      this.recipeService.setRecipes(response);
    }));
  }

  createAndStorePost(postData: Post) {
    return this.http.post<Post>(`${this.domain}/posts.json`, postData, {
      observe: 'response'
    });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(`${this.domain}/posts.json`, {
      headers: new HttpHeaders({
        'Custom-Header': 'Hello'
      }),
      params: new HttpParams().set('print', 'pretty')
    }).pipe(map((response) => {
      const postArray: Post[] = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          postArray.push({ ...response[key], id: key });
        }
      }
      return postArray;
    }));
  }

  deletePosts() {
    return this.http.delete(`${this.domain}/posts.json`, {
      observe: 'events'
    }).pipe(
      tap((event) => {
        console.log(event);
      })
    );
  }
}
