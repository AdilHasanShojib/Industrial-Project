import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member:Members | undefined;
  user: User | null= null;

  constructor(public memberService:MembersService,public authservice:AuthService){
    this.authservice.currentUser$.pipe(take(1)).subscribe((res)=>{
     this.user= res;
    });
  }
  ngOnInit(): void {
    this.loadMember();
  }



  loadMember(){
  if(!this.user) return;
  this.memberService.getMemberByUserName(this.user.username).subscribe({
    next:(res) => {this.member= res},
  })


  }

}
