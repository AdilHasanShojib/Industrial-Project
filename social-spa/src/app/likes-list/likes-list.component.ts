import { Component, OnInit } from '@angular/core';
import { Members } from '../_models/members';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-likes-list',
  templateUrl: './likes-list.component.html',
  styleUrls: ['./likes-list.component.css'],
})
export class LikesListComponent implements OnInit {
  predicate = 'liked';
  members: Members[] | undefined;
  pagination: Pagination | undefined;
  pageSize = 5;
  pageNumber = 1;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
 this.loadUserLikes(this.predicate);
  }

  loadUserLikes(likePredicate: string) {
    this.predicate = likePredicate;
    this.memberService
      .getUserLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response) {
            this.pagination = response.pagination;
            this.members = response.result;
          }
        },
      });
  }
  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadUserLikes(this.predicate);
  }
}
