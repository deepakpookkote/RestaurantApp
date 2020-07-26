import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { LoginService } from 'src/app/auth/login.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  userInfo: User;
  isAuthenticated = false;

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataService: PostService, private authService: LoginService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe((userData => {
      this.userInfo = userData;
      this.isAuthenticated = !!userData;
    }));
  }

  onSaveData() {
    this.dataService.storeRecipe();
  }

  loadRecipes() {
    this.dataService.loadRecipes().subscribe();
  }

  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
