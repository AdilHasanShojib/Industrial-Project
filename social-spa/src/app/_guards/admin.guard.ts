import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import {  map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const autheService = inject(AuthService); 
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return autheService.currentUser$.pipe(
          map((user) => {
            if(!user) return false;
            if(user.roles.includes('Admin') || user.roles.includes('Moderator')) {
              return true;
            } else {
              toastr.error('You cannot enter this area');
              return router.createUrlTree(['/members']);
            }
          })
        );
};
