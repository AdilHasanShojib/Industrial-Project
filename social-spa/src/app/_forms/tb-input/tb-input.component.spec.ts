import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbInputComponent } from './tb-input.component';

describe('TbInputComponent', () => {
  let component: TbInputComponent;
  let fixture: ComponentFixture<TbInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TbInputComponent]
    });
    fixture = TestBed.createComponent(TbInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
