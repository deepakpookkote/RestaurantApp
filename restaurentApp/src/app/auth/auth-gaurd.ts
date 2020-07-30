import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAppState from '../store/app.reducer';
@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
    constructor(private authService: LoginService, private router: Router, private store: Store<fromAppState.AppState>) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                console.log(authState,'djdjjdjdd')
                return authState.user;
            }),
            map(user => {
            // return !!user;
            console.log('user',user);
            const isAuth = !!user;
            if (isAuth) {
                console.log('in');
                return true;
            } else {
                return this.router.createUrlTree(['/auth']);
            }
        })
        // , tap(isAuth => {
        //     if (!isAuth) {
        //         this.router.navigate(['/auth']);
        //     }
        // })
        );
    }
}
