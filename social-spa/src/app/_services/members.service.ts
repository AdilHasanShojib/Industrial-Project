import { Injectable } from '@angular/core';
import { UserParams } from '../_models/user-params';
import { getPaginationHeader, getPaginationResult } from '../_helpers/paginationHelper';
import { Members } from '../_models/members';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseUrl=environment.apiUrl;
members: Members[]=[];
userParams:UserParams|undefined;
user:User | undefined;
memberCache=new Map();
  constructor(private http:HttpClient,private authService:AuthService) {
    this.authService.currentUser$.subscribe({
    next:(res)=> {
      if(res){
        this.userParams=new UserParams(res);
        this.user=res;
      }
    }


    })
   }




  getMembers(userParams:UserParams)  {

//  const response = this.memberCache.get(Object.values(userParams).join('-'));
//  if(response) return of(response);

 let params=getPaginationHeader(userParams.pageNumber,UserParams.pageSize);
 params=params.append('minAge',userParams.minAge);
 params=params.append('maxAge',userParams.maxAge);
 params=params.append('gender',userParams.gender);
 params=params.append('orderBy',userParams.orderBy);

 if(this.user){

  params=params.append('currentUserName',this.user?.username);
 }
 
 return getPaginationResult<Members[]>(this.baseUrl+'users',params,this.http).pipe(
  map((res)=>{
    this.memberCache.set(Object.values(userParams).join('-'),res);
    return res;
  })


 );





  }


getMemberByUserName(userName?: string){
  return this.http.get<Members>(this.baseUrl + 'users/get-userByName'+userName);
}

getUserParams(){
  return this.userParams;
}

setUserParams(params: Userparams){

  this.userParams=params;
}




}
