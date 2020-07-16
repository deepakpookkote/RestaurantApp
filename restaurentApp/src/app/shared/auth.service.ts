import { Injectable } from '@angular/core';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor() { }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 5000);
    });
    return promise;
  }

  logIn() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
