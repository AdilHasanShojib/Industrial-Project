// import { CanActivateFn } from '@angular/router';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class AuthGuard implements CanActivate {

   constructor(private authservice:AuthService,private toastr:ToastrService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   return this.authservice.currentUser$.pipe(
    map((user)=> {
     if(user){
      return true;
     } else{
      this.toastr.error(('unauthorized'));
      return false;
      
     }


   }) )
  


  
}

}
