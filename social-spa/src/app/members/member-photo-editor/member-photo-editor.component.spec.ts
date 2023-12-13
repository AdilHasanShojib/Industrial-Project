import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPhotoEditorComponent } from './member-photo-editor.component';

describe('MemberPhotoEditorComponent', () => {
  let component: MemberPhotoEditorComponent;
  let fixture: ComponentFixture<MemberPhotoEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberPhotoEditorComponent]
    });
    fixture = TestBed.createComponent(MemberPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
