import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private latLong = new Subject<any>();
  private latLongHistory = new Subject<any>();
  constructor() { }

  public positionsUpdate(markers: Marker[]) {
    this.latLong.next(markers);
  }
  public positionsHistoryUpdate(markers: Marker[]) {
    this.latLongHistory.next(markers);
  }

  getPositions(): Observable<any> {
    return this.latLong.asObservable();
  }

  getPositionHistory(): Observable<any> {
    return this.latLongHistory.asObservable();
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  id?: string;
  time?: number;
  address?: string;
  icon?: string;
}
