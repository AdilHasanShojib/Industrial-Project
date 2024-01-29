import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Members } from 'src/app/_models/members';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-photo-editor',
  templateUrl: './member-photo-editor.component.html',
  styleUrls: ['./member-photo-editor.component.css']
})
export class MemberPhotoEditorComponent implements OnInit {

  @Input() memberData : Members | undefined;

  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User  | undefined;

  constructor(private authService: AuthService, private membersService: MembersService){
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if(user) this.user = user;
      }
    })
  }
  ngOnInit(): void {
    this.initUploadPhoto();
  }
  fileOverBase(event : any) {
    this.hasBaseDropZoneOver = event;

  }

  initUploadPhoto() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-image',
      authToken: `Bearer ${this.user?.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 
    });
    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.memberData?.photos.push(photo);
        if(photo.isMain && this.user && this.memberData) {
          this.user.photoUrl = photo.url;
          this.memberData.photoUrl = photo.url;
          this.authService.setCurrentUser(this.user);
        }
      }
    }
  }
  setUseMainImage(photo: Photo) {
    this.membersService.setMainImage(photo.id).subscribe({
     next: () => {
      if(this.user && this.memberData) {
        this.user.photoUrl = photo.url;
        this.authService.setCurrentUser(this.user);
        this.memberData.photoUrl = photo.url;
        this.memberData.photos.forEach((p) => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        })
      }
     }
    })
  }
  deleteUserImage(photoId: number) {
    this.membersService.deleteImage(photoId).subscribe({
      next: () => {
       if(this.memberData) {
        this.memberData.photos = this.memberData.photos.filter(
          (x) => x.id != photoId
        )
       }
      }
     })
  }

}
