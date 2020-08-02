import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  loadedPosts: Post[] = [];
  isLoading = false;
  isError = null;

  domain = 'https://ng-complete-guide-68acf.firebaseio.com';
  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData).subscribe((res) => {
      this.getPosts();
    }, error => {
    });
  }

  getPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe((post) => {
      this.loadedPosts = post;
      this.isLoading = false;
    }, error => {
      this.isError = error.error.error;
    });
  }

  deletePosts() {
    this.postService.deletePosts().subscribe((res) => {
        this.getPosts();
    });
  }

}
