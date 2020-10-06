import { Component, OnInit, Input } from '@angular/core';
import { PositionsService } from '../../services/positions.service';
import { AngularFireList } from 'angularfire2/database';
import { Subscription } from 'rxjs';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.component.html',
  styleUrls: ['./history-map.component.css']
})
export class HistoryMapComponent implements OnInit {
  showMarker = false;
  markerDetail: any;
  weight: 50;
  lat = 30.7333;
  zoom = 16;
  lng = 76.7794;
  markerInfo = '';
  subscription: Subscription;
  previous;

  items: AngularFireList<any[]>;
  positions: Marker[] = [];
  @Input()
  height: number;
  constructor(
    private positionsService: PositionsService,
    private mapService: MapService
  ) {
    if (this.height === undefined) {
      this.height = 500;
    }
  }

  clickedMarker(position: Marker, index: number, infoWindow) {
    if (this.previous === infoWindow) {
      return;
    }
    if (this.previous !== null && this.previous !== undefined) {
      this.previous.close();
    }

    this.previous = infoWindow;
    this.markerInfo = `Name: ${position.label}, Time: ${new Date(
      position.time
    ).toLocaleString()}`;
  }

  mapClicked($event: MouseEvent) {
    console.log('mapClicked', $event);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit() {
    this.getPositions();
    this.previousInfo();
    this.getMapLocation();
    this.getMarkerInfo();
  }

  getPositions() {
    this.subscription = this.positionsService
      .getPositionHistory()
      .subscribe(positionMarkers => {
        this.positions = positionMarkers;
      });
  }
  getMarkerInfo() {
    this.subscription = this.mapService.markerInfoStatus().subscribe(marker => {
      if (!marker) {
        this.showMarker = false;
        this.markerDetail = marker;
        return;
      }
      this.showMarker = true;
      this.markerDetail = marker;
      const infoWindow = {};
      this.clickedMarker(this.markerDetail, 0, infoWindow);
    });
  }
  previousInfo() {
    this.subscription = this.mapService
      .infoStatus()
      .subscribe(setPreviousNull => {
        this.previous = setPreviousNull;
      });
  }
  getMapLocation() {
    this.subscription = this.mapService
      .mapPositionStatus()
      .subscribe(mapPosition => {
        this.lat = mapPosition.lat;
        this.lng = mapPosition.lng;
      });
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  id: string;
  time: number;
}
