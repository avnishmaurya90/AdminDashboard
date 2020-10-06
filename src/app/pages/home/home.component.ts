import { AdminDashboardStats } from './../../model/admin-dashboard-stats';
import { PanelService } from './../../services/panel.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './../../services/socket.service';
import { Chart } from 'chart.js';
import { MapService } from 'src/app/services/map.service';
import { VendorService } from 'src/app/vendors/services/vendor.service';
import { PositionsService } from 'src/app/services/positions.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { OnSite } from 'src/app/model/site';
import { Vendor } from 'src/app/vendors/models/vendor';
import { ApiPage } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription;
  isLoading = false;
  orderCanvas: any;
  driverCanvas: any;
  vendorCanvas: any;
  resourceCanvas: any;


  orderChart = [];
  driverChart = [];
  vendorChart = [];
  resourceChart = [];
  bufferTime: number =
    moment()
      .subtract(30, 'minutes')
      .unix() * 1000;
  positions: any;
  vendors: Vendor[];
  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;

  adminStats: AdminDashboardStats;

  constructor(
    private db: AngularFireDatabase,
    private positionsService: PositionsService,
    private vendorService: VendorService,
    private mapService: MapService,
    private socketService: SocketService,
    private panelService: PanelService) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.vendorList();
    this.getStats();
    this.updateStats();
  }

  getOrderChart() {
    this.orderCanvas = document.getElementById('orderChart');
    const ctx = this.orderCanvas.getContext('2d');
    this.orderChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          `Unassigned (${this.adminStats.initiatedOrders})`,
          `Not Picked (${this.adminStats.assignedOrders})`,
          `Ongoing (${this.adminStats.startedOrders})`,
          `Completed (${this.adminStats.deliveredOrders})`
        ],
        datasets: [
          {
            data: [
              this.adminStats.initiatedOrders,
              this.adminStats.assignedOrders,
              this.adminStats.startedOrders,
              this.adminStats.deliveredOrders
            ],
            backgroundColor: [
              '#f8bd47',
              '#f96e51',
              '#2177c2',
              '#2fb949',
            ],
            borderWidth: [2, 2, 2, 2],
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }]
        }
      },
      centerText: {
        display: true,
        text: this.adminStats.totalOrders
      },
      plugins: [{
        beforeDraw: function (chart, options) {
          if (chart.config.centerText.display !== null &&
            typeof chart.config.centerText.display !== 'undefined' &&
            chart.config.centerText.display) {
            const width = chart.chart.width;
            const height = chart.chart.height + chart.chart.chartArea.top;
            const newCtx = chart.chart.ctx;

            newCtx.restore();
            const fontSize = (chart.chart.height / 114).toFixed(2);
            // newCtx.font = fontSize + 'em sans-serif';
            // newCtx.textBaseline = 'middle';

            const text = chart.config.centerText.text;
            const textX = Math.round((width - newCtx.measureText(text).width) / 2);
            const textY = height / 2;

            newCtx.fillText(text, textX, textY);
            newCtx.fillText('TOTAL', textX - 8, textY - 24);

            newCtx.save();
          }
        }
      }]
    });
  }

  getDriverChart() {
    this.driverCanvas = document.getElementById('driverChart');
    const ctx = this.driverCanvas.getContext('2d');
    this.driverChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          `Offline(${this.adminStats.unavailableDrivers})`,
          `OnPickup (${this.adminStats.assignedDrivers})`,
          `OnDelivery (${this.adminStats.onDeliveryDrivers || 0})`,
          `Available (${this.adminStats.availableDrivers})`
        ],
        datasets: [
          {
            data: [
              this.adminStats.unavailableDrivers,
              this.adminStats.assignedDrivers,
              this.adminStats.onDeliveryDrivers,
              this.adminStats.availableDrivers
            ],
            backgroundColor: [
              '#f8bd47',
              '#f96e51',
              '#2177c2',
              '#2fb949',
            ],
            borderWidth: [2, 2, 2, 2],
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }]
        }
      },
      centerText: {
        display: true,
        text: this.adminStats.totalDrivers
      },
      plugins: [{
        beforeDraw: function (chart, options) {
          if (chart.config.centerText.display !== null &&
            typeof chart.config.centerText.display !== 'undefined' &&
            chart.config.centerText.display) {
            const width = chart.chart.width;
            const height = chart.chart.height + chart.chart.chartArea.top;
            const newCtx = chart.chart.ctx;

            newCtx.restore();
            const fontSize = (chart.chart.height / 114).toFixed(2);
            // newCtx.font = fontSize + 'em sans-serif';
            // newCtx.textBaseline = 'middle';

            const text = chart.config.centerText.text;
            const textX = Math.round((width - newCtx.measureText(text).width) / 2);
            const textY = height / 2;

            newCtx.fillText(text, textX, textY);
            newCtx.fillText('TOTAL', textX - 8, textY - 24);

            newCtx.save();
          }
        }
      }]
    });
  }

  getVendorChart() {
    this.vendorCanvas = document.getElementById('vendorChart');
    const ctx = this.vendorCanvas.getContext('2d');

    this.vendorChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          `Online (${this.adminStats.openVendors})`,
          `Offline (${this.adminStats.closeVendors})`
        ],
        datasets: [
          {
            data: [this.adminStats.openVendors, this.adminStats.closeVendors],
            backgroundColor: [
              '#f8bd47',
              '#f96e51',
              '#2177c2',
              '#2fb949',
            ],
            borderWidth: [2, 2, 2, 2],
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }]
        }
      },
      centerText: {
        display: true,
        text: this.adminStats.totalVendors
      },
      plugins: [{
        beforeDraw: function (chart, options) {
          if (chart.config.centerText.display !== null &&
            typeof chart.config.centerText.display !== 'undefined' &&
            chart.config.centerText.display) {
            const width = chart.chart.width;
            const height = chart.chart.height + chart.chart.chartArea.top;
            const newCtx = chart.chart.ctx;

            newCtx.restore();
            const fontSize = (chart.chart.height / 114).toFixed(2);
            // newCtx.font = fontSize + 'em sans-serif';
            // newCtx.textBaseline = 'middle';

            const text = chart.config.centerText.text;
            const textX = Math.round((width - newCtx.measureText(text).width) / 2);
            const textY = height / 2;

            newCtx.fillText(text, textX, textY);
            newCtx.fillText('TOTAL', textX - 8, textY - 24);

            newCtx.save();
          }
        }
      }]
    });
  }

  getResourceChart() {
    this.resourceCanvas = document.getElementById('resourceChart');
    const ctx = this.resourceCanvas.getContext('2d');

    this.resourceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          `Online (${this.adminStats.openVendors})`,
          `Offline (${this.adminStats.closeVendors})`
        ],
        datasets: [
          {
            data: [this.adminStats.openVendors, this.adminStats.closeVendors],
            backgroundColor: [
              '#f8bd47',
              '#f96e51',
              '#2177c2',
              '#2fb949',
            ],
            borderWidth: [2, 2, 2, 2],
            fill: true
          }
        ]
      },
      options: {
        legend: {
          labels: {
            usePointStyle: true,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false,
            }
          }]
        }
      },
      centerText: {
        display: true,
        text: this.adminStats.totalVendors
      },
      plugins: [{
        beforeDraw: function (chart, options) {
          if (chart.config.centerText.display !== null &&
            typeof chart.config.centerText.display !== 'undefined' &&
            chart.config.centerText.display) {
            const width = chart.chart.width;
            const height = chart.chart.height + chart.chart.chartArea.top;
            const newCtx = chart.chart.ctx;

            newCtx.restore();
            const fontSize = (chart.chart.height / 114).toFixed(2);
            // newCtx.font = fontSize + 'em sans-serif';
            // newCtx.textBaseline = 'middle';

            const text = chart.config.centerText.text;
            const textX = Math.round((width - newCtx.measureText(text).width) / 2);
            const textY = height / 2;

            newCtx.fillText(text, textX, textY);
            newCtx.fillText('TOTAL', textX - 8, textY - 24);
            newCtx.save();
          }
        }
      }]
    });
  }

  getStats() {
    this.panelService.adminStats({}).subscribe((adminStats: AdminDashboardStats) => {
      this.isLoading = false;
      this.adminStats = adminStats;
      this.getOrderChart();
      this.getDriverChart();
      this.getVendorChart();
      this.getResourceChart();
    });
  }

  updateStats() {
    this.socketService.getRealTimeStats().subscribe((adminStats: AdminDashboardStats) => {
      this.adminStats = adminStats;
      this.getOrderChart();
      this.getDriverChart();
      this.getVendorChart();
      this.getResourceChart();
    });
  }

  getDriverPositions = drivers => {
    this.mapService.liveMapPosition({
      lat: drivers.length ? drivers[0].Last_Location.latitude : '',
      lng: drivers.length ? drivers[0].Last_Location.longitude : ''
    });
    return drivers.map(driver => {
      if (!driver.dutyStatus) {
        driver.dutyStatus = 'unavailable';
      }
      return {
        lat: driver.Last_Location.latitude,
        lng: driver.Last_Location.longitude,
        label: driver.userName,
        draggable: false,
        opacity: driver.dutyStatus === 'unavailable' ? 0.5 : 1,
        id: driver.driver_id,
        time: driver.Last_Location.time,
        icon: {
          url: `/assets/icons/${driver.dutyStatus}Driver.png`,
          scaledSize: {
            height: 40,
            width: 20
          }
        }
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
      .list('Driver_App_Data/Driver_Location/Live_Location')
      .valueChanges()
      .subscribe((drivers: OnSite[]) => {
        if (drivers.length) {
          this.mapService.info();
          this.positions = [
            ...this.getDriverPositions(drivers),
            // ...this.getVendorsPositions(this.vendors)
          ];
          this.positionsService.positionsUpdate(this.positions);
        } else {
          this.positions = this.getVendorsPositions(this.vendors);
          this.positionsService.positionsUpdate(this.positions);
        }
      });
  }



}
