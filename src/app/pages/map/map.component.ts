import { Component, OnInit, Input } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { MouseEvent } from '@agm/core';
import { Subscription } from 'rxjs';
import { PositionsService } from 'src/app/services/positions.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
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

    if (position.time) {
      this.markerInfo = `Name: ${position.label}, Time: ${new Date(
        position.time
      ).toLocaleString()}`;
    }
    if (position.address) {
      this.markerInfo = `Name: ${position.label}, Address: ${position.address}`;
    }
  }

  mapClicked($event: MouseEvent) {
    console.log('mapClicked', $event);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit() {
    this.previousInfo();
    this.getPositions();
    this.getLiveMapLocation();
  }

  getPositions() {
    this.subscription = this.positionsService
      .getPositions()
      .subscribe(positionMarkers => {
        this.positions = positionMarkers;
      });
  }

  previousInfo() {
    this.subscription = this.mapService
      .infoStatus()
      .subscribe(setPreviousNull => {
        this.previous = setPreviousNull;
      });
  }

  getLiveMapLocation() {
    this.subscription = this.mapService
      .liveMapPositionStatus()
      .subscribe(mapPosition => {
        console.log(mapPosition);
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
  time?: number;
  address?: string;
  icon?: string;
  opacity?: number;
}
