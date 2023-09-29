import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isRegForms: boolean=false;
  hide=true;
  loginForm:FormGroup;

  constructor(public fb:FormBuilder,public authService:AuthService,public router:Router){
    this.loginForm=new FormGroup({});

  }

  ngOnInit(): void {
    this.initalizeForms();
  }

  initalizeForms(){
    this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
  }

  onTabChange(event :MatTabChangeEvent){
   if(event.tab.textLabel=== 'Login') {
    this.isRegForms=false;
   }
    
   if(event.tab.textLabel=== 'Register') {
    this.isRegForms=true;
   }
    

  }

userLogin(){
this.authService.onLogin(this.loginForm.value).subscribe({
  next:(response:any)=>{
    if (response){
      this.router.navigateByUrl('/');
    }
    //console.log(response);
  }
})
  
}



}
