import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Driver } from '../../models/driver';
import { DriverService } from '../../services/driver.service';
import { ApiPage } from 'src/app/model';

@Component({
  selector: 'app-driver-status',
  templateUrl: './driver-status.component.html',
  styleUrls: ['./driver-status.component.css']
})
export class DriverStatusComponent implements OnInit {

  maxDate = new Date(new Date());
  minDate = new Date(2018, 8, 1);
  date = '';
  email = '';
  name = '';
  mobile = '';
  code = '';
  isRejected: boolean;
  isSuspended: boolean;
  isActive: boolean;
  isInactive: boolean;
  drivers: Driver[];
  isLoading = true;
  showFilter = false;
  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;
  searchMobile: FormControl = new FormControl();
  paginator: MatPaginator;

  constructor(private driverService: DriverService,
    private toastrService: ToastrService) {
    this.searchMobile.valueChanges
      .subscribe(data => {
        this.code = data;
        this.driverList();
      });
  }

  ngOnInit() {
    this.driverList();
  }

  reset() {
    this.name = '';
    this.mobile = '';
    this.date = '';
    this.email = '';
    this.code = '';
    this.isRejected = null;
    this.isSuspended = null;
    this.isActive = null;
    this.isInactive = null;
    this.driverList();
  }

  driverList = () => {
    this.isLoading = true;
    let status = '';
    if (this.isActive) {
      status = 'active';
    }
    if (this.isInactive) {
      status = 'inactive';
    }
    this.getDriversList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      createdAt: this.date,
      code: this.code,
      isRejected: this.isRejected,
      isSuspended: this.isSuspended,
      status: status
    });
  }

  getDriversList = filters => {
    this.driverService.list(filters).subscribe(
      (drivers: ApiPage) => {
        this.isLoading = false;
        this.pageSize = drivers.pageSize;
        this.total = drivers.total;
        this.pageIndex = drivers.pageNo - 1;
        this.drivers = drivers.items;
      },
      err => {
        this.toastrService.error('Unable to Get List', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }

  handlePage(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.driverList();
  }


}
