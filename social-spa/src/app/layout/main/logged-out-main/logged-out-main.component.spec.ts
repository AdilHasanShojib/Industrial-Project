import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutMainComponent } from './logged-out-main.component';

describe('LoggedOutMainComponent', () => {
  let component: LoggedOutMainComponent;
  let fixture: ComponentFixture<LoggedOutMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedOutMainComponent]
    });
    fixture = TestBed.createComponent(LoggedOutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
