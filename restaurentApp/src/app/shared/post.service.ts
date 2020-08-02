import { Injectable } from '@angular/core';
import { Post } from '../features/create-post/post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { Recipe } from '../features/recipe/recipe.model';
import { LoginService } from '../auth/login.service';
import { Store } from '@ngrx/store';
import * as fromAppState from '../store/app.reducer';
import * as RecipeActions from '../features/recipe/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  domain = 'https://ng-complete-guide-68acf.firebaseio.com';


  constructor(
    private http: HttpClient,
    private authService: LoginService,
    private store: Store<fromAppState.AppState>) { }


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
      })
    );
  }
}
