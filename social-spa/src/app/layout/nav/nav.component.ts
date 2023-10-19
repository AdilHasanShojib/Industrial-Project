import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,OnDestroy {
  isLoggedIn: boolean=false;
  constructor(public authService:AuthService, public router: Router){
    this.loggedIn();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
 
  ngOnInit(): void{


  }
  
  loggedIn(){

    this.authService.currentUser$.subscribe({
     next: (res: any) =>{
      if(res){
        this.isLoggedIn=true;
      }
     }

    })
    
  }

  onLogOut(){
    this.authService.loggedOut();
    this.router.navigate(['/']);

  }
}
