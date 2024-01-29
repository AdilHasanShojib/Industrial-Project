import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequestCound = 0; 
  constructor(private spinerService: NgxSpinnerService) { }

  showSpinner(){
    this.loadingRequestCound++;
    this.spinerService.show(undefined, {
      type: 'pacman',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color : "#fff",
      size : "large"
    })
  }

  hideSpinner(){
    this.loadingRequestCound--;
    if(this.loadingRequestCound <=0) {
      this.loadingRequestCound = 0;
      this.spinerService.hide();
    }
  }
}
