import { Component } from '@angular/core';

@Component({
  selector: 'app-member-photo-editor',
  templateUrl: './member-photo-editor.component.html',
  styleUrls: ['./member-photo-editor.component.css']
})
export class MemberPhotoEditorComponent {

  @Input() memberData: Members | undefined;


}
