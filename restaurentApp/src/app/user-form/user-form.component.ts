import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  secret: string;
  username: string;
  email: string;
  genders = ['male', 'female'];
  userSignUpForm: FormGroup;
  forbiddenUserNames = ['test', 'demo'];
  constructor() { }

  ngOnInit(): void {
    this.userSignUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  get controls() {
    return (this.userSignUpForm.get('hobbies') as FormArray).controls;
  }

  // *ngFor="let hobbyControl of controls; let i = index"

  onSubmit() {
    console.log(this.userSignUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.userSignUpForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden': true
      };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // onSubmit(form: HTMLFontElement){
  //   console.log(form);
  //   // console.log(this.secret, this.username, this.email);
  // }

}
