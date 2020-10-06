import { AdminDashboardStats } from './../model/admin-dashboard-stats';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }


  getRealTimeStats() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('getAdminDashboardStats', (data: AdminDashboardStats) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
