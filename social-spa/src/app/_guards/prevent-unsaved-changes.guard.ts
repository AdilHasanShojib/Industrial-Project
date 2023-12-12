import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (Component) => {
  if(Component.editform?.dirty){
    alert("You have unsave Changed");
  }
  
  return of(true);
};
