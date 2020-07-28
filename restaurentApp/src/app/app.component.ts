import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from './auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: LoginService, @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin();
    }
    console.log('test-console');
  }
}
