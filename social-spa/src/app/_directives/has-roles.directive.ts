import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRoles]' // *appHasRoles["Admin", "Moderator"]
})
export class HasRolesDirective implements OnInit {
@Input() appHasRoles: string[] = [];
user: User = {} as User
  constructor( private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>,
    private authService: AuthService
    ) {
      this.authService.currentUser$.pipe(take(1)).subscribe({
        next: (res) => {
          if(res) this.user = res;
        }
      })
     }
  
  ngOnInit(): void {
    if(this.user.roles.some((r)=> this.appHasRoles.includes(r) )) {
      console.log(this.user.roles);
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
