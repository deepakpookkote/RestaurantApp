import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}
@Injectable()
export class AuthEffects {
    // ngrx effect will automatically dispatch and action for us. so no need to dispatch an action here
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map(resData => {
                    /**
                     * inside map if request reaches means we have a successful-
                     * login so we need to dispatch and action to inform our reducer
                     */
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return new AuthActions.Login(
                        {
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        }
                    );
                }),
                catchError(errorRes => {
                    let errorMessage = 'An Unknown Error Occurred';
                    if (!errorRes.error || !errorRes.error.error) {
                      return of(new AuthActions.LoginFail(errorMessage));
                    }
                    switch (errorRes.error.error.message) {
                      case 'EMAIL_EXISTS':
                        errorMessage = 'This email is already exists';
                        break;
                      case 'EMAIL_NOT_FOUND':
                        errorMessage = 'Invalid user email';
                        break;
                      case 'INVALID_PASSWORD':
                        errorMessage = 'Invalid user password';
                        break;
                      default:
                        errorMessage = 'Something went wrong!!';
                    }
                    return of(new AuthActions.LoginFail(errorMessage));
                }),
            );
        })
    );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/recipes']);

        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}
