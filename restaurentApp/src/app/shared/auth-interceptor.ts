import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: LoginService, private store: Store<fromApp.AppState>) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('request is on its way - interceptor');
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            const modifiedRequest = req.clone({
                params: new HttpParams().set('auth', user.token)
            });
            return next.handle(modifiedRequest);
        }));

    }
}
