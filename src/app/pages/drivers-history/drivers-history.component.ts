import { Component, OnInit } from '@angular/core';
import { Driver } from '../../drivers/models/driver';
import { DriverService } from '../../drivers/services/driver.service';
import { ApiPage } from '../../model';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { PositionsService } from '../../services/positions.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-drivers-history',
  templateUrl: './drivers-history.component.html',
  styleUrls: ['./drivers-history.component.css']
})
export class DriversHistoryComponent implements OnInit {
  positions: any;
  showMarker = false;
  tickInterval = 1;
  hour = 1;
  isHistory = false;
  isLoading = false;
  maxDate = new Date(new Date());
  minDate = new Date(2018, 8, 1);
  thumbLabel = true;
  startLocation: number;
  endLocation: number;
  value = 0;
  drivers: Driver[] = [];
  selectedDriver: Driver;
  selectedDate: number =
    moment()
      .startOf('day')
      .unix() * 10000;

  oneHourList = [];
  twoHourList = [];
  threeHourList = [];
  fourHourList = [];
  fiveHourList = [];
  sixHourList = [];
  sevenHourList = [];
  eightHourList = [];
  nineHourList = [];
  tenHourList = [];
  elevenHourList = [];
  twelveHourList = [];
  thirteenHourList = [];
  fourteenHourList = [];
  fifteenHourList = [];
  sixteenHourList = [];
  seventeenHourList = [];
  eighteenHourList = [];
  nineteenHourList = [];
  twentyHourList = [];
  twentyOneHourList = [];
  twentyTwoHourList = [];
  twentyThreeHourList = [];
  twentyFourHourList = [];
  date = new Date();
  message: string;

  constructor(
    private driverService: DriverService,
    private db: AngularFireDatabase,
    private toastrService: ToastrService,
    private positionsService: PositionsService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.driversList();
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value;
  }

  getDriverPositions = locations => {
    this.mapService.mapPosition({
      lat: locations[0].latitude,
      lng: locations[0].longitude
    });
    return locations.map(location => {
      return {
        lat: location.latitude,
        lng: location.longitude,
        label: this.selectedDriver.firstName,
        draggable: false,
        id: this.selectedDriver.id,
        time: location.time
      };
    });
  }

  driversList() {
    this.driverService.list({ status: 'active' }).subscribe((data: ApiPage) => {
      this.drivers = data.items;
    });
  }

  getHourlyTimeStamp(date, hour) {
    const timestamp =
      moment(date)
        .startOf('day')
        .unix() *
      1000 +
      hour * 60 * 60 * 1000;

    return timestamp;
  }

  historyQuery(date, iteration) {
    return this.db.list(
      `Driver_App_Data/Driver_Location/Drive_Location_History/${
      this.selectedDriver.id
      }/All_Locations/`,
      ref =>
        ref
          .orderByKey()
          .startAt(`${this.getHourlyTimeStamp(date, iteration)}`)
          .endAt(`${this.getHourlyTimeStamp(date, iteration + 1)}`)
    );
  }

  getHourlyLogs(date, iteration) {
    switch (iteration) {
      case 0:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.oneHourList = driverHistory;
          });
        break;
      case 1:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twoHourList = driverHistory;
          });
        break;
      case 2:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.threeHourList = driverHistory;
          });
        break;
      case 3:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.fourHourList = driverHistory;
          });
        break;
      case 4:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.fiveHourList = driverHistory;
          });
        break;
      case 5:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.sixHourList = driverHistory;
          });
        break;
      case 6:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.sevenHourList = driverHistory;
          });
        break;
      case 7:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.eightHourList = driverHistory;
          });
        break;
      case 8:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.nineHourList = driverHistory;
          });
        break;
      case 9:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.tenHourList = driverHistory;
          });
        break;
      case 10:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.elevenHourList = driverHistory;
          });
        break;
      case 11:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twelveHourList = driverHistory;
          });
        break;
      case 12:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.thirteenHourList = driverHistory;
          });
        break;
      case 13:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.fourteenHourList = driverHistory;
          });
        break;
      case 14:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.fifteenHourList = driverHistory;
          });
        break;
      case 15:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.sixteenHourList = driverHistory;
          });
        break;
      case 16:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.seventeenHourList = driverHistory;
          });
        break;
      case 17:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.eighteenHourList = driverHistory;
          });
        break;
      case 18:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.nineteenHourList = driverHistory;
          });
        break;
      case 19:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twentyHourList = driverHistory;
          });
        break;
      case 20:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twentyOneHourList = driverHistory;
          });
        break;
      case 21:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twentyTwoHourList = driverHistory;
          });
        break;
      case 22:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twentyThreeHourList = driverHistory;
          });
        break;
      case 23:
        this.historyQuery(date, iteration)
          .valueChanges()
          .subscribe((driverHistory: any) => {
            this.twentyFourHourList = driverHistory;
          });
        break;
      default:
        break;
    }
    this.isHistory = true;
    this.isLoading = false;
  }

  onInputChange(hourlyLogs, hour) {
    this.mapService.info();
    this.hour = hour;
    this.endLocation = hourlyLogs.length;
    this.positions = this.getDriverPositions(hourlyLogs);
    this.positionsService.positionsHistoryUpdate(this.positions);
    this.mapService.markerInfoUpdate(null);
  }

  showMarkerDetails(event, logs) {
    if (event.value) {
      const marker = {
        lat: logs[event.value - 1].latitude,
        lng: logs[event.value - 1].longitude,
        label: this.selectedDriver.firstName,
        draggable: false,
        id: this.selectedDriver.id,
        time: logs[event.value - 1].time
      };
      this.mapService.markerInfoUpdate(marker);
    }
  }

  getLocationHistory() {
    if (!this.selectedDriver) {
      return this.toastrService.error('Please Select Driver', '', {
        timeOut: 3000,
        tapToDismiss: true
      });
    }

    if (!this.date) {
      return this.toastrService.error('Please Select Date', '', {
        timeOut: 3000,
        tapToDismiss: true
      });
    }
    this.selectedDate =
      moment(this.date)
        .startOf('day')
        .unix() * 1000;
    const nextDay =
      moment(this.selectedDate)
        .add(1, 'days')
        .startOf('day')
        .unix() * 1000;
    this.isLoading = true;

    this.db
      .list(
        `Driver_App_Data/Driver_Location/Drive_Location_History/${
        this.selectedDriver.id
        }/All_Locations/`,
        ref =>
          ref
            .orderByKey()
            .startAt(`${this.selectedDate}`)
            .endAt(`${nextDay}`)
      )
      .valueChanges()
      .subscribe((driverHistory: any) => {
        this.positionsService.positionsHistoryUpdate([]);
        this.resetDriversHistory();
        if (!driverHistory.length) {
          this.message = 'No History Available for this date';
          this.isLoading = false;
          this.isHistory = false;
          return this.toastrService.error('No History Available', '', {
            timeOut: 3000,
            tapToDismiss: true
          });
        }
        this.resetDriversHistory();
        this.message = '';

        for (let i = 0; i <= 23; i++) {
          this.getHourlyLogs(this.date, i);
        }
      });
  }

  resetDriversHistory() {
    this.oneHourList = [];
    this.twoHourList = [];
    this.threeHourList = [];
    this.fourHourList = [];
    this.fiveHourList = [];
    this.sixHourList = [];
    this.sevenHourList = [];
    this.eightHourList = [];
    this.nineHourList = [];
    this.tenHourList = [];
    this.elevenHourList = [];
    this.twelveHourList = [];
    this.thirteenHourList = [];
    this.fourteenHourList = [];
    this.fifteenHourList = [];
    this.sixteenHourList = [];
    this.seventeenHourList = [];
    this.eighteenHourList = [];
    this.nineteenHourList = [];
    this.twentyHourList = [];
    this.twentyOneHourList = [];
    this.twentyTwoHourList = [];
    this.twentyThreeHourList = [];
    this.twentyFourHourList = [];
  }
}
