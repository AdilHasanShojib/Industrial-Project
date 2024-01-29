import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Members } from '../_models/members';
import { UserParams } from '../_models/user-params';
import { getPaginatedResult, getPaginationHeader } from '../_helpers/paginationHelper';
import { AuthService } from './auth.service';
import { map, of, take } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Members[] = [];
  userParams: UserParams | undefined;
  user: User | undefined ;
  memberCache = new Map();  
  constructor(private http:HttpClient, private authService: AuthService) { 
    this.authService.currentUser$.subscribe(
      {
        next: (res)=> {
          if(res) {
            this.userParams = new UserParams(res);
            this.user = res;
          }
        }
      }
    )
  }

  getMembers(userParams:UserParams) {
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response) return of(response);
    let params = getPaginationHeader(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender );
    params = params.append('orderBy', userParams.orderBy);
    params = params.append('orderBy', userParams.orderBy);
    if(this.user) {
      params = params.append('currentUsername', this.user?.username);
    }

    return getPaginatedResult<Members[]>(this.baseUrl +'users', params, this.http).pipe(
      map((res) => {
          this.memberCache.set(Object.values(userParams).join('-'), res);
          return res;
      })
    );
    
  }

  getMemberByUserName(userName?: string){
    const member = [...this.memberCache.values()].reduce((arr, elem)=> arr.concat(elem.result), [])
                    .find((member: Members) => member.userName === userName);
    if(member) return of(member);          
    return this.http.get<Members>(this.baseUrl + 'users/get-userByName/'+ userName);
  }

  updateMember(member: Members) {
    return this.http.put(this.baseUrl + 'users', member);
  }

  setMainImage(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-image/' + photoId, {}); 
  }

  

  deleteImage(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId); 
  }
  addLike(userName: String){
    return this.http.post(this.baseUrl + 'likes/' + userName, {}); 
  }
  getUserLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Members[]>(this.baseUrl +'likes', params, this.http)
  }
  getUserParams() {
    return this.userParams;
  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }
}
