import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 mindate: Date = new Date();
  isRegistraionForm : boolean = false;
  hide = true;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  constructor(public fb: FormBuilder,
     public authService: AuthService,
     public router: Router,
     public toastr: ToastrService
     ){
    this.loginForm = new FormGroup({});
    this.registrationForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initalizeForms();
    this.mindate.setFullYear(this.mindate.getFullYear() - 18);
  }
  initalizeForms() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registrationForm = this.fb.group({
      gender: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[ Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['',[ Validators.required, this.matchConfirmPassword('password')]]
    });
    this.registrationForm?.controls?.['password'].valueChanges.subscribe(() => {
      this.registrationForm?.controls?.['confirmPassword'].updateValueAndValidity();
    });
  }

  
  onTabChange(event : MatTabChangeEvent) {
    if(event.tab.textLabel === 'Login') {
      this.isRegistraionForm = false;
    }
    if(event.tab.textLabel === 'Register') { 
      this.isRegistraionForm = true;
    }
  }
  userLogin(){
    this.authService.onLogin(this.loginForm.value).subscribe({
      next: (response: any)=> {
        if(response) {
        
          this.router.navigateByUrl('/');
        }
        console.log(response);
      }, 
      error: (_err) =>  {},
      complete: () => {
        this.toastr.success('Welcom to the techbyte social app!');
      }
    })
  }
  userRegister(){
    console.log(this.registrationForm);
    const dob = this.getDateOnly(
      this.registrationForm.controls['dateOfBirth'].value
    );
    const values = {...this.registrationForm.value, dateOfBirth:dob};
    console.log(values);
    this.authService.onRegister(values).subscribe({
      next: (response: any)=> {
        if(response) {
          this.router.navigateByUrl('/');
        }
        console.log(response);
      }
    })
  }
  private getDateOnly(dob: string | undefined) {
    if(!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }

  private matchConfirmPassword(password: string): ValidatorFn {
    return (confirmPwd: AbstractControl) => {
      return confirmPwd.value === confirmPwd.parent?.get(password)?.value ? null : {notMatched: true}
    }
  }
}
