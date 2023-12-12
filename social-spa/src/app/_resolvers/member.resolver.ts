import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Members } from '../_models/members';
import { inject } from '@angular/core';
import { MembersService } from '../_services/members.service';

export const memberResolver: ResolveFn<Members> = (route: ActivatedRouteSnapshot) => {
  return inject(MembersService).getMemberByUserName(route.paramMap.get('userName')!);
};
