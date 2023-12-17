import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-photo-editor',
  templateUrl: './member-photo-editor.component.html',
  styleUrls: ['./member-photo-editor.component.css']
})
export class MemberPhotoEditorComponent implements OnInit {

  @Input() memberData: Members | undefined;

  uploader: FileUploader | undefined;
  hasBaseDropZoneOver=false;
  baseUrl=environment.apiUrl;
  user: User | undefined;

  constructor(private authService:AuthService){
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next:(user)=> {
        if(user) this.user=user;
      }
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  fileOverBase(event :  any){
    this.hasBaseDropZoneOver=event;
  }

 initUploadPhoto(){
this.uploader=new FileUploader({
url:this.baseUrl+ 'user/add-image',
authToken: `Bearer ${this.user?.token}`,
isHTML5:true,
allowedFileType: ['image'],
removeAfterUpload: true,
autoUpload: false,
maxFileSize: 10 * 1024 * 1024

});

this.uploader.onAfterAddingAll= (file) => {
  file.withCredentials= false;
}

this.uploader.onSuccessItem=(Item, response, status, headers) => {

  if(response) {
  const photo = JSON.parse(response);
  this.memberData?.photos.push(photo);
  if(photo.isMain && this.user && this.memberData){
    this.user.photoUrl=photo.url;
    this.memberData.photoUrl=photo.url;
    this.authService.setCurrentUser(this.user);
  }

  }


}



 }





}
