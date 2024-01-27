import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbDatePickerComponent } from './tb-date-picker.component';

describe('TbDatePickerComponent', () => {
  let component: TbDatePickerComponent;
  let fixture: ComponentFixture<TbDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TbDatePickerComponent]
    });
    fixture = TestBed.createComponent(TbDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
