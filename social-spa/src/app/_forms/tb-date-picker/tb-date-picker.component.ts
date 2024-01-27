import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-tb-date-picker',
  templateUrl: './tb-date-picker.component.html',
  styleUrls: ['./tb-date-picker.component.css']
})
export class TbDatePickerComponent implements ControlValueAccessor{
@Input() label = '';
@Input() minDate: Date | undefined;

constructor(@Self() public ngControl: NgControl) {
  this.ngControl.valueAccessor = this;
}


get control(): FormControl {
  return this.ngControl.control as FormControl;
}

writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
