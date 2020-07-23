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
    // this.http.post<{title: string, content: string}>(`${this.domain}/posts.json`, postData).subscribe((res) => {
    //   console.log(res);
    // }, error => {
    //   console.log(error);
    // });
    this.postService.createAndStorePost(postData).subscribe((res) => {
      console.log(res);
      this.getPosts();
    }, error => {
      console.log(error);
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
    // this.http.get(`${this.domain}/posts.json`).pipe(map((response: {[key: string]: Post}) => {
    // this.http.get<{[key: string]: Post}>(`${this.domain}/posts.json`).pipe(map((response) => {
    //   const postArray: Post[] = [];
    //   for (const key in response) {
    //     if (response.hasOwnProperty(key)) {
    //       postArray.push({...response[key], id: key});
    //     }
    //   }
    //   return postArray;
    // })).subscribe((data) => {
    //   console.log(data[0].title);
    //   this.loadedPosts = data;
    //   this.isLoading = false;
    // });
  }

  deletePosts() {
    this.postService.deletePosts().subscribe((res) => {
        this.getPosts();
    });
  }

}
