import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/user-params';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit,OnDestroy {
  userParams: UserParams|undefined;
  members:Members[]=[];
  pagination:Pagination| undefined;
 


  
  //paginationdata=5;

  // length = 50;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];






  genderList=[
     {value: 'male', display: 'Male'},
     {value: 'female', display: 'Female'},
     {value: 'other', display: 'Others'},
  ] 
  baseUrl=environment.apiUrl;
  constructor(public http:HttpClient,public toastr:ToastrService){

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }




  ngOnInit(): void {
    // this.http.get(`${this.baseUrl}users`).subscribe({
    //   next:() => {},
    //   error:() =>{
    //     this.toastr.error('Bearer token not found');
    //   }
    // })
  }



}
