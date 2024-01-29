import { inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Members } from '../_models/members';
import { MembersService } from '../_services/members.service';

export const memberResolver: ResolveFn<Members> = (route: ActivatedRouteSnapshot) => {
  // const route = inject(ActivatedRouteSnapshot);
  console.log("🚀 ~ file: member.resolver.ts:9 ~ route.snapshot.params['userName']:", route.paramMap.get('userName'))
  return inject(MembersService).getMemberByUserName(route.paramMap.get('userName')!); 
  
};
