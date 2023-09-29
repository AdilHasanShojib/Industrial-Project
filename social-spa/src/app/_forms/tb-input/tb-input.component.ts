import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-tb-input',
  templateUrl: './tb-input.component.html',
  styleUrls: ['./tb-input.component.css']
})
export class TbInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() iconHide = true;
  @Input() passwordType = 'password';
  @Input() types = !this.iconHide && this.passwordType === 'password' ? 'password':'text' ;

  constructor(@Self() public ngControl:NgControl){
    this.ngControl.valueAccessor=this;

  }
  
  get control(): FormControl{
    return this.ngControl.control as FormControl;
  }
  
  onEyeClick(hide:boolean){
     this.types= !this.iconHide && this.passwordType === 'password' ? 'password':'text' ;
     this.iconHide=!hide;
  }
  
  
  
  writeValue(obj: any): void {
   
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

}
