import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Members } from 'src/app/_models/members';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
@ViewChild('editForm') editForm: NgForm | undefined;

@HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  if(this.editForm?.dirty) {
    $event.returnValue = true;
  }
}

member: Members | undefined;
user: User | null = null;

constructor(public memberService: MembersService,
  public toaster: ToastrService,
   public authService: AuthService){
  this.authService.currentUser$.pipe(take(1)).subscribe((res)=> {
    this.user = res;
  });
}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    if(!this.user) return;
    this.memberService.getMemberByUserName(this.user.username).subscribe({
      next: (res) => (this.member = res),
    })
  }

  updateUser() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toaster.success('Profile Updated');
        this.editForm?.reset(this.member);
      }
    })

  }

}
