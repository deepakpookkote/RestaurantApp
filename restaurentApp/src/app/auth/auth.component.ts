import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService, AuthResponseData } from './login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  isError: string = null;


  constructor(private authService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe((resData) => {
      console.log(resData);
      this.router.navigate(['/recipes']);
      this.isLoading = false;
    }, error => {
      this.isError = error;
      this.isLoading = false;
    });
    form.reset();
  }

}
