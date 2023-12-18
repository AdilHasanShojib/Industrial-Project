import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

 getMessages(){


 }
getMessageThread(){


}


sendMessage(){
  
}


}
