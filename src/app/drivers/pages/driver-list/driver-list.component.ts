import { Component, OnInit } from '@angular/core';
import { Driver } from '../../models/driver';
import { DriverService } from '../../services/driver.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { ApiPage } from '../../../model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from '../../../dialogs/confirm/confirm.component';
import { DriverDetailComponent } from '../../dialogs/driver-detail/driver-detail.component';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
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

  constructor(
    private driverService: DriverService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {
    this.isLoading = true;
    this.searchMobile.valueChanges
      .subscribe(data => {
        this.mobile = data;
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

  viewDetail(driver: Driver, isUpdate: boolean): void {
    const dialogRef = this.dialog.open(DriverDetailComponent, {
      width: '980px',
      height: '800px',
      data: { driver: driver, isUpdate: isUpdate }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.driverList();
    });
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

  deleteDriver = (id) => {
    this.driverService.driverDelete(id).subscribe(
      data => {
        this.driverList();
        this.toastrService.warning(data.message, '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      },
      err => {
        this.toastrService.error('Unable to Delete', '', {
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

  confirmDialog(driver, action): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(isConfirm => {
      if (isConfirm) {
        switch (action) {
          case 'delete':
            this.deleteDriver(driver.id);
            break;
        }
      }
    });
  }
}
