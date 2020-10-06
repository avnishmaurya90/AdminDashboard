import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private message = new Subject<any>();
  private latLong = new Subject<any>();
  private liveCoordinates = new Subject<any>();
  private previousInfo = new Subject<any>();
  private markerInfo = new Subject<any>();
  constructor() { }
  public live() {
    this.message.next(true);
  }

  public history() {
    this.message.next(false);
  }

  public info() {
    this.previousInfo.next(null);
  }

  public markerInfoUpdate(marker: any) {
    this.markerInfo.next(marker);
  }

  public mapPosition(mapLatLng: LatLng) {
    this.latLong.next(mapLatLng);
  }

  public liveMapPosition(mapLatLng: LatLng) {
    this.liveCoordinates.next(mapLatLng);
  }

  mapStatus(): Observable<any> {
    return this.message.asObservable();
  }

  infoStatus(): Observable<any> {
    return this.previousInfo.asObservable();
  }

  mapPositionStatus(): Observable<any> {
    return this.latLong.asObservable();
  }

  liveMapPositionStatus(): Observable<any> {
    return this.liveCoordinates.asObservable();
  }

  markerInfoStatus(): Observable<any> {
    return this.markerInfo.asObservable();
  }
}

interface LatLng {
  lat: number;
  lng: number;
}
