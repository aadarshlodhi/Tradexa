import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  public posts: any[] = [];
  public showForm = false;
  public title = '';
  public body = '';
  public errorMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
  this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe((res) => {
      console.log('API Response:', res);
      this.posts = res;

    });
  }

  addPost() {
  if (!this.title || !this.body) return alert('Please fill both fields');
  const newPost = { title: this.title, body: this.body };
  this.http.post<any>('https://jsonplaceholder.typicode.com/posts', newPost)
    .subscribe((res) => {
      this.posts.unshift(res);
      this.title = '';
      this.body = '';
      console.log('Post added:', res);
    });
}

}
