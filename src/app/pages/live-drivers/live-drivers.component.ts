import { Component, OnInit } from '@angular/core';
import { OnSite } from '../../model/site';
import { AngularFireDatabase } from 'angularfire2/database';
import { PositionsService } from '../../services/positions.service';
import * as moment from 'moment';
import { MapService } from '../../services/map.service';
import { Vendor } from '../../vendors/models/vendor';
import { VendorService } from '../../vendors/services/vendor.service';
import { ApiPage } from '../../model';

@Component({
  selector: 'app-live-drivers',
  templateUrl: './live-drivers.component.html',
  styleUrls: ['./live-drivers.component.css']
})
export class LiveDriversComponent implements OnInit {
  liveDrivers: OnSite[] = [];
  isLogoutDrivers = false;
  logOutDrivers: OnSite[] = [];
  bufferTime: number =
    moment()
      .subtract(30, 'minutes')
      .unix() * 1000;
  positions: any;
  vendors: Vendor[];
  displayedColumns: string[] = ['name', 'date'];
  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;
  constructor(
    private db: AngularFireDatabase,
    private positionsService: PositionsService,
    private vendorService: VendorService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.vendorList();
  }

  getDriverPositions = drivers => {
    this.mapService.liveMapPosition({
      lat: drivers.length ? drivers[0].Last_Location.latitude : '',
      lng: drivers.length ? drivers[0].Last_Location.longitude : ''
    });
    return drivers.map(driver => {
      return {
        lat: driver.Last_Location.latitude,
        lng: driver.Last_Location.longitude,
        label: driver.userName,
        draggable: false,
        opacity: !driver.isLogin ? 0.5 : 1,
        id: driver.driver_id,
        time: driver.Last_Location.time
      };
    });
  }

  getVendorsPositions = vendors => {
    return vendors.map(vendor => {
      return {
        lat: vendor.location.coordinates[1],
        lng: vendor.location.coordinates[0],
        label: vendor.name,
        draggable: false,
        opacity: 1,
        id: vendor.id,
        address: vendor.address,
        icon: '/assets/arrow.png'
      };
    });
  }

  filterLiveDrivers = drivers => {
    return drivers.filter(driver => {
      return driver.isLogin && driver.Last_Location.time > this.bufferTime;
    });
  }

  getVendorsList = filters => {
    this.vendorService.list(filters).subscribe((vendors: ApiPage) => {
      this.pageSize = vendors.pageSize;
      this.total = vendors.total;
      this.pageIndex = vendors.pageNo - 1;
      this.vendors = vendors.items;
      this.getLiveDrivers();
    });
  }

  vendorList = () => {
    this.getVendorsList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex
    });
  }

  getLiveDrivers() {
    this.db
      .list('Driver_App_Data/Driver_Location/Live_Location', ref =>
        ref.orderByChild('Last_Location/time').startAt(this.bufferTime)
      )
      .valueChanges()
      .subscribe((drivers: OnSite[]) => {
        if (drivers.length) {
          this.mapService.info();
          this.liveDrivers = this.filterLiveDrivers(drivers);
          this.positions = [
            ...this.getDriverPositions(this.liveDrivers),
            ...this.getDriverPositions(this.logOutDrivers),
            ...this.getVendorsPositions(this.vendors)
          ];
          this.positionsService.positionsUpdate(this.positions);
        } else {
          this.positions = this.getVendorsPositions(this.vendors);
          this.positionsService.positionsUpdate(this.positions);
        }
      });
  }

  getLogOutDrivers() {
    this.isLogoutDrivers = true;
    this.db
      .list('Driver_App_Data/Driver_Location/Live_Location', ref =>
        ref.orderByChild('isLogin').equalTo(false)
      )
      .valueChanges()
      .subscribe((drivers: OnSite[]) => {
        if (drivers.length) {
          this.mapService.info();
          this.logOutDrivers = drivers;
          this.positions = [
            ...this.getDriverPositions(this.logOutDrivers),
            ...this.getDriverPositions(this.liveDrivers),
            ...this.getVendorsPositions(this.vendors)
          ];
          this.positionsService.positionsUpdate(this.positions);
        } else {
          this.positionsService.positionsUpdate(this.positions);
        }
      });
  }

  clearLogOutDrivers() {
    this.isLogoutDrivers = false;
    this.logOutDrivers = [];
    this.positions = [
      ...this.getDriverPositions(this.liveDrivers),
      ...this.getVendorsPositions(this.vendors)
    ];
    this.positionsService.positionsUpdate(this.positions);
  }
}
