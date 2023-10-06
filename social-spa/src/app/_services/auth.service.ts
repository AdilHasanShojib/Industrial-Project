import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=environment.apiUrl;
  private currentUserSource = new BehaviorSubject<any|null>(null);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }


  onLogin(model : any){

   return this.http.post<any>(`${this.baseUrl}auth/login`,model).pipe(
      map((response:any)=>{
           const user = response;
           if(user){
        this.setCurrentUser(user);
           }
           return user;
      })
    )

  }
  
  onRegister(model : any){

    return this.http.post<any>(`${this.baseUrl}auth/register`,model).pipe(
       map((response:any)=>{
            const user = response;
            if(user){
         this.setCurrentUser(user);
            }
            return user;
       })
     )
 
   }





  setCurrentUser(user: any) {
    localStorage.setItem('currentUser',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  loggedOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSource.next(null);

   }


}
