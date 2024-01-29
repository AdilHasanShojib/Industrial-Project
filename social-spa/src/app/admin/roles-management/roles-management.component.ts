import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RolesModalComponent } from 'src/app/_modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent implements OnInit {
  users: User[] = [];
  constructor(private adminService: AdminService, 
    private toaster: ToastrService,
     private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.adminService.getUserWithRoles().subscribe({
      next: (res) => {
        this.users =res;
       },
    });
  }

  openEditModal(user : User) {
    const dialogRef = this.dialog.open(RolesModalComponent, { data: user});
    dialogRef.afterClosed().subscribe((result: User) => {
      if(result) {
        this.adminService.editUserRoles(result.username, result.roles.toString()).subscribe({
          next: (roles) => {
            user.roles = roles;
            this.toaster.success('Roles has been updated');
          }
        })
      }
    })
  }
  
}
