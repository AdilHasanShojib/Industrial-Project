import { Injectable } from '@angular/core';
import { UserParams } from '../_models/user-params';
import { getPaginationHeader } from '../_helpers/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() { }




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
 
 





  }


getMemberByUserName(userName: string){
  return this.http.get<Members>(this.baseUrl + 'users'+userName);
}

getUserParams(){
  return this.userParams;
}

setUserParams(params: Userparams){

  this.userParams=params;
}




}
