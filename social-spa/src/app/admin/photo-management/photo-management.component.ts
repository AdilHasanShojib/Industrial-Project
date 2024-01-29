import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Photo } from 'src/app/_models/photo';
import { PhotoParams } from 'src/app/_models/photo-params';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css'],
})
export class PhotoManagementComponent implements OnInit {
  photoParams = { pageNumber: 1, pageSize: 10 } as PhotoParams;
  pagination?: Pagination;
  photos?: Photo[];

  constructor(private adminService: AdminService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.loadUnapprovedPhotos();
  }

  loadUnapprovedPhotos() {
    this.adminService.getPhotosForApproval(this.photoParams).subscribe({
      next: (res) => {
        this.photos = res.result;
        this.pagination = res.pagination;
      },
    });
  }
  pageChanged(event: any) {
    if (this.photoParams) {
      this.photoParams.pageNumber = event.pageIndex + 1;
      this.photoParams.pageSize = event.pageSize;
      this.loadUnapprovedPhotos();
    }
  }

  approvePhoto(photoId: number, userId: number) {
    this.adminService.approvePhoto(photoId, userId).subscribe({
      next: (res) => {
        if (res) {
          this.photos?.map((x) => {
            if (x.id == res.id) {
              x.isApproved = res.isApproved;
              this.toaster.success('Photo Approved');
              this.loadUnapprovedPhotos();
            }
          });
        }
      },
    });
  }
  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: (res) => {
        if (res) {
          this.photos?.map((x) => {
            if (x.id == res.id) {
              x.isRejected = res.isRejected;
              this.toaster.warning('Photo Rejected');
              this.loadUnapprovedPhotos();
            }
          });
        }
      },
    });
  }
}
