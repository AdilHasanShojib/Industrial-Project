import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnDestroy(): void { 
  }

  ngOnInit(): void {}
  
  onLogout() {
    this.authService.loggedOut(); 
    this.router.navigate(['/']);
  }
}
