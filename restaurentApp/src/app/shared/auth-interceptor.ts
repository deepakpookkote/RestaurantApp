import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { take, exhaustMap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: LoginService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('request is on its way - interceptor');
        return this.authService.user.pipe(take(1), exhaustMap(user => {
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
