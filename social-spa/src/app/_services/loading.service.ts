import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingReqCount=0;

  constructor(private spinerService: NgxSpinnerService) { }

  showSpinner(){
  this.loadingReqCount++;
  this.spinerService.show(undefined,{
    type: 'pacman',
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'large',
    color: '#fff',
  })

  }

hideSpinner(){

  this.loadingReqCount--;
  if(this.loadingReqCount <=0){
    this.loadingReqCount=0;
    this.spinerService.hide();
  }


}

}
