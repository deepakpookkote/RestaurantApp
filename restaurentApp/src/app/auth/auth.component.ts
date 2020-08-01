import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromAppState from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  isError: string = null;
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
  private alertComponentSubscription: Subscription;
  private storeSubscription: Subscription;



  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromAppState.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.isError = authState.authError;
      if (this.isError && !this.isLoading) {
        console.log(this.isError);
        this.showErrorAlert(this.isError);
      }
    });
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

    // let authObs: Observable<AuthResponseData>; we don't require this observable now

    // this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new authActions.LoginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(new authActions.SignupStart({email: email, password: password}));
    }

    form.reset();
  }

  closeAlert() {
    this.store.dispatch(new authActions.HandleError());
  }

  private showErrorAlert(errorMessage: string) {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = errorMessage;
    this.alertComponentSubscription = componentRef.instance.close.subscribe(() => {
      this.alertComponentSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.alertComponentSubscription) {
      this.alertComponentSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }



}
