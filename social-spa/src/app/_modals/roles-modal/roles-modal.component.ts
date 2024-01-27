import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  username = '';
  rolesForm: FormGroup;
  availableRoles = ['Admin', 'Moderator', 'Member'];
  selectedRoles: any[] = [];
  constructor(public fb: FormBuilder, 
    public dialogRef: MatDialogRef<RolesModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: User) {
    this.rolesForm = new FormGroup({});
  }
  ngOnInit(): void {
    this.rolesForm = this.fb.group({
      selectedRoles: [this.data.roles]
    })
  }

  OnSaveModal(){
    if(this.rolesForm.value.selectedRoles.length > 0) {
      this.data.roles = this.rolesForm.value.selectedRoles;
    }
    this.dialogRef.close(this.data);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
