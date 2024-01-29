import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject< User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }

  onLogin(model : any)  {
    return this.http.post<User>(`${this.baseUrl}auth/login`, model).pipe(
      map((response : User) => {
        const user = response;
        if(user) {
          /// Set Current User
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }
  onRegister(model : any)  {
    return this.http.post<User>(`${this.baseUrl}auth/register`, model).pipe(
      map((response : User) => {
        const user = response;
        if(user) {
          /// Set Current User
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }

  loggedOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSource.next(null);
  }

}
