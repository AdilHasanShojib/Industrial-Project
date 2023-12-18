import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Members } from 'src/app/_models/members';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  isOnline = true;
  @Input() member:Members | undefined;
  constructor(private memberService:MembersService,private toastrService:ToastrService){


  }

  addUserLike(member:Members){
    this.memberService.addLike(member.Name).subscribe({
    next:()=> this.toastrService.success('You Have liked'+ member.knownAs)
    });
  }



}
