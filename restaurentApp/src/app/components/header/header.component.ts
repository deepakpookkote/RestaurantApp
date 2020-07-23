import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataService: PostService) { }

  ngOnInit(): void {
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

}
