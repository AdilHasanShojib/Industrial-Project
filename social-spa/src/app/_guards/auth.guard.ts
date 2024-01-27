import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import {  map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const autheService = inject(AuthService); 
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return autheService.currentUser$.pipe(
          map((user) => {
            if (user) {
              return true;
            } else {
              toastr.error('Unauthorized');
              return router.createUrlTree(['/login']);
            }
          })
        );
};

// export class AuthGuard implements CanActivate {
//   constructor(
//     private authservice: AuthService,
//     private toastr: ToastrService
//   ) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> {
//     // this.toastr.error('Unauthorized');
//     return this.authservice.currentUser$.pipe(
//       map((user) => {
//         if (user) {
//           return true;
//         } else {
//           this.toastr.error('Unauthorized');
//           return false;
//         }
//       })
//     );
//   }
// }
