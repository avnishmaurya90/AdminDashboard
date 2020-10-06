import { Vendor } from './../../models/vendor';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from '../../services/vendor.service';
import { ApiPage } from 'src/app/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-list-graph',
  templateUrl: './vendor-list-graph.component.html',
  styleUrls: ['./vendor-list-graph.component.css']
})
export class VendorListGraphComponent implements OnInit {

  isLoading: boolean;
  vendors: Vendor[];
  lat = 30.7333;
  zoom = 10;
  lng = 76.7794;
  markerInfo = '';
  isSuspended: boolean;
  isNotSuspended: boolean;
  all = true;
  status: string;
  subscription: Subscription;
  previous;
  height = 350;
  isClosed: boolean;
  isOpen: boolean;

  positions: Marker[] = [];

  constructor(
    private vendorService: VendorService,
    private toastrService: ToastrService
  ) {
  }

  clickedMarker(position: Marker, index: number, infoWindow) {
    if (this.previous === infoWindow) {
      return;
    }
    if (this.previous !== null && this.previous !== undefined) {
      this.previous.close();
    }
    this.previous = infoWindow;
    this.markerInfo = `Name: ${position.label}`;
  }

  mapClicked($event: MouseEvent) {
    console.log('mapClicked', $event);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  getPositions = (vendors: Vendor[]) => {
    this.positions = [];
    if (this.isClosed || this.isNotSuspended || this.isOpen || this.isSuspended) {
      this.all = false;
    } else {
      this.all = true;
    }
    vendors.forEach((vendor: Vendor) => {
      this.positions.push({
        lat: vendor.location.coordinates[1],
        lng: vendor.location.coordinates[0],
        label: vendor.name,
        draggable: false,
        opacity: 1,
        id: vendor.id,
      });
    });
    this.isLoading = false;
  }

  getVendorsList = filters => {
    this.vendorService.list(filters).subscribe(
      (vendors: ApiPage) => {
        this.vendors = vendors.items;
        if (this.vendors && !this.vendors.length) {
          this.toastrService.info('No Records Found', '', { timeOut: 3000 });
        }
        this.getPositions(vendors.items);
      },
      err => {
      }
    );
  }

  vendorList = () => {
    this.isLoading = true;
    let dutyStatus = '';
    let isSuspended: boolean;
    if (this.isOpen) {
      dutyStatus = 'available';
    }
    if (this.isClosed) {
      dutyStatus = 'unavailable';
    }
    if (this.isClosed && this.isOpen) {
      dutyStatus = '';
    }

    if (this.isSuspended) {
      isSuspended = this.isSuspended;
    }
    if (this.isNotSuspended) {
      isSuspended = !this.isNotSuspended;
    }

    if (this.isSuspended && this.isNotSuspended) {
      isSuspended = undefined;
    }
    // const isSuspended = this.isSuspended || !this.isNotSuspended || '';
    // const dutyStatus = this.isOpen ? 'available' : '' || this.isClosed ? 'unavailable' : '';
    this.getVendorsList({
      noPaging: true,
      isSuspended: isSuspended,
      dutyStatus: dutyStatus
    });
  }



  ngOnInit() {
    this.isLoading = true;
    this.vendorList();
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
