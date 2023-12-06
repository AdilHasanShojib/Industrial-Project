import { User } from "./user";

export class UserParams {

   
        
        gender: string;
        minAge=18;

        maxAge=99;

        pageNumber=1;
        pageSize=10;

        orderBy = 'lastActivity';

        constructor(user: User){
          this.gender=user?.gender == 'female' ? 'male' : 'female';            
        }
       
  






}
