import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Members } from 'src/app/_models/members';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/user-params';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit, OnDestroy {
  userParams: UserParams | undefined;
  members : Members[] = [];
  pagination: Pagination | undefined;
  // paginationdata = 5;
  // length = 30;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];

  genderList = [
    {value: 'male', display: 'Male'},
    {value: 'female', display: 'Female'},
    {value: 'other', display: 'Others'},
  ]


  constructor( private memberService: MembersService,  public toaster: ToastrService) {
    this.userParams = this.memberService.getUserParams() ;
  }
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {

    if(this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: (res) => {
          if(res.result && res.pagination) {
            this.members = res.result;
            this.pagination = res.pagination;
          }
        }
      });
    }
  }

  pageChanged(event: any) {
    if(this.userParams) {
      this.userParams.pageNumber = event.pageIndex + 1;
      this.userParams.pageSize = event.pageSize;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }


}
