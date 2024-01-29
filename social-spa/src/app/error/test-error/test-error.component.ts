import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
 baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) {}

  get500Error() {
    this.http.get(this.baseUrl +'error/server-error').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err), 
    });
  }

  get400Error() {
    this.http.get(this.baseUrl +'error/bad-request').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err), 
    });
  }

  get401Error() {
    this.http.get(this.baseUrl +'error/auth').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err), 
    });
  }

  get404Error() {
    this.http.get(this.baseUrl +'error/not-found').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err), 
    });
  }
  get404ValidationError() {
    this.http.post(this.baseUrl +'auth/login', {userName: 'asdlkj', password:'1121'}).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err), 
    });
  }

}
