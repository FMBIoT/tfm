import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) {}

  getSensores() {
    return this.http.get(`${environment.api_uri}api/v1/iot/`);
  }

  getChartData(id: string, type: string) {
    return this.http.get(`${environment.api_uri}api/v1/iot/entity/history/${id}/${type}/`);
  }


  updateSensores(id: string, type: string, value: string){
    return this.http.post(`${environment.api_uri}api/v1/iot/entity/${id}`, {type, value});
  }

  initializeSensores(){
    return this.http.get(`${environment.api_uri}api/v1/iot/agent/initialize/`);
  }

  // getHistoricalData(id: string){
  //   return this.http.post(`${environment.api_uri}api/v1/iot/historical`,{id});
  // }

  getHistoricalData(id: string,type:string){
    return this.http.post(`${environment.api_uri}api/v1/iot/historical`,{id,type});
  }

  getCurrentData(id: string,type:string){
    return this.http.post(`${environment.api_uri}api/v1/iot/current`,{id,type});
  }

  getSubscriptions(){
    return this.http.get(`${environment.api_uri}api/v1/iot/subscriptions`);
  }
}
