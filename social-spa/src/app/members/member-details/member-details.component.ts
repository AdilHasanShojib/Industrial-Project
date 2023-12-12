import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

constructor(private route:ActivatedRoute,private memberService:MembersService){
  console.log(this.route.snapshot.params['userName']);
}
  ngOnInit(): void {
    this.memberService.getMemberByUserName(this.route.snapshot.params['userName']).subscribe({

      next: (res) => {
        this.member = res;
      },
      complete: ()=> {}
    });
  }


}
