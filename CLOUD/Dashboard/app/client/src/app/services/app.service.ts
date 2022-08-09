import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  socket: any;

  constructor() {
    
    // this.socket = io(`${environment.api_uri}`, {secure:true})
    this.socket = io(`${environment.api_uri}`)

   }
  }