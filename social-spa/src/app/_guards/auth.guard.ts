 import { CanActivateFn, Router } from '@angular/router';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
   const authservice = inject(AuthService);
   const toastr = inject(ToastrService);
   const router = inject(Router);
   return authservice.currentUser$.pipe(
          map((user)=> {
           if(user){
            return true;
           } else{
            toastr.error(('unauthorized'));
            return router.createUrlTree(['/login']);
      
            
           }
      
      
         }) )
};

// export class AuthGuard implements CanActivate {

//    constructor(private authservice:AuthService,private toastr:ToastrService){}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//    return this.authservice.currentUser$.pipe(
//     map((user)=> {
//      if(user){
//       return true;
//      } else{
//       this.toastr.error(('unauthorized'));
//       return false;
      
//      }


//    }) )
  


  
// }

// }
