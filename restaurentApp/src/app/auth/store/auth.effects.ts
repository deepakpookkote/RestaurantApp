import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { LoginService } from '../login.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(
        {
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate,
            redirect: true
        }
    );
};

const handleError = (errorRes: any) => {
    let errorMessage = 'An Unknown Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
                tap((resData) => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    /**
                     * inside map if request reaches means we have a successful-
                     * login so we need to dispatch and action to inform our reducer
                     */
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                }),
            );
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            console.log(authSuccessAction.payload.redirect,'authSuccessAction.payload.redirect');
            if (authSuccessAction.payload.redirect) {
                console.log('test-ebfre')
                this.router.navigate(['/']);
            }
        })
        ));

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return {
                    type: 'DUMMY'
                };
            }
            console.log('inside map')
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

                tap((resData) => {
                    this.authService.setLogoutTimer(expirationDuration);
                });
                return new AuthActions.AuthenticateSuccess(
                    {
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._tokenExpirationDate),
                        redirect: false
                    }
                );
            }
            return {
                type: 'DUMMY'
            };
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap((resData) => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    /**
                     * inside map if request reaches means we have a successful-
                     * login so we need to dispatch and action to inform our reducer
                     */
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                }),
            );
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: LoginService) { }
}
