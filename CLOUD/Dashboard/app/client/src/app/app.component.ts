import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { AppService } from './services/app.service';
import { GlobalVariables } from './shared/global-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;
  updateMes: any = {};
  arrayRes: any = [];
  arrayHistorical: any = [];
	historicalTitles : any = []; 

  constructor(
    private dataService: DataService,
    private appService: AppService,

  ) {
    this.getUpdateMessages();
    this.getHistorical();
    this.checkSubscriptions();
  }
  title = 'app';


  initializeIoT(){
    this.dataService.initializeSensores().subscribe()
  }

  checkSubscriptions(){
    this.dataService.getSubscriptions().subscribe(
      res=>{
        this.arrayRes = res
        if(this.arrayRes.length == 0){
          this.initializeIoT()
        }
      }
    )
  }

  getUpdateMessages(){
    this.appService.socket.on('fiwareUpdate', (data: any) => {
        GlobalVariables.activityUser.push(data)
      });
  }

  getHistorical(){
    this.appService.socket.on('historicalRequest', (datos: any) => {
      if(GlobalVariables.historical.length != 0){
        datos.forEach((element: any) =>GlobalVariables.historical.push(element))
        GlobalVariables.historical.forEach((element:any)=>{
          Object.keys(element).forEach((key:any) => this.historicalTitles.push(key))
          this.historicalTitles.reduce(
            (unique:any, item:any) => (unique.includes(item) ? unique : [...unique, item]),
            [],
          );
          for(const key of this.historicalTitles){
            if (!(key in element)){
              element[key] = {'value':'-'}
            }
          }
        })
      }else{
        datos.forEach((element: any) =>GlobalVariables.historical.push(element))
        console.log(GlobalVariables.historical)
      }
    });
  }

}
