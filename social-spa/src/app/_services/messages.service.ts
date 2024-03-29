import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeader } from '../_helpers/paginationHelper';
import { Messages } from '../_models/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('container', container);
    return getPaginatedResult<Messages[]>(this.baseUrl+ 'messages', params, this.http);
  }

  getMessagesThread(username: string) {
    return this.http.get<Messages[]>(this.baseUrl + 'messages/thread/' + username);
  }
  sendMessage(username: string, content: string) {
    return this.http.post<Messages>(this.baseUrl + 'messages', {recipientUsername: username, content})
  }
  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
