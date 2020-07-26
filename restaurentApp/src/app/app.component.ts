import { Component, OnInit } from '@angular/core';
import { LoginService } from './auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: LoginService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
