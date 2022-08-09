import { Component } from '@angular/core';
// import { AppService } from '../../services/app.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import { GlobalVariables } from '../../shared/global-variables';

@Component({
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  providers: [NgbPaginationConfig]

})
export class CardsComponent {
  data: any;
  updateMes: any = {};
  arrayMes: any = [];
  activityUsera = GlobalVariables.activityUser

  constructor(
  ) {}
  
  p: number = 1;
  

  clear(){
    this.activityUsera=[]
    GlobalVariables.activityUser=[]
    this.activityUsera=GlobalVariables.activityUser
  }
}
