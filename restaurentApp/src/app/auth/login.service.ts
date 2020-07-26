import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { pipe, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
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

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);

  token = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD70Gx9z20bRD_8x88daPKdzJD_ODq0AZU',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleErrors), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn));
    }));
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD70Gx9z20bRD_8x88daPKdzJD_ODq0AZU`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrors), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expireIn: number) {

    const expirationDate = new Date(new Date().getTime() + +expireIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expireIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrors(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
}