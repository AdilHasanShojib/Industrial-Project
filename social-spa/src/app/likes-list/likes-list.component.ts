import { Component, OnInit } from '@angular/core';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-likes-list',
  templateUrl: './likes-list.component.html',
  styleUrls: ['./likes-list.component.css']
})
export class LikesListComponent implements OnInit {
  
  predicted='liked';
  member: Members[]=[];
  pagination:pagination|undefined;
  pageSize= S;
  pageNumber= l;
  constructor(private memberService:MembersService){}
  
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

loadUserLikes(likePredicate:string){
  this.predicted=likePredicate;
}


}
