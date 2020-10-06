import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Driver } from '../../models/driver';
import { DriverService } from '../../services/driver.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ApiPage } from '../../../model';
import { ToastrService } from 'ngx-toastr';
import { DocumentsComponent } from '../../dialogs/documents/documents.component';
import { RejectComponent } from '../../dialogs/reject/reject.component';
@Component({
  selector: 'app-approved-driver',
  templateUrl: './approved-driver.component.html',
  styleUrls: ['./approved-driver.component.css']
})
export class ApprovedDriverComponent implements OnInit, AfterViewInit {

  drivers: Driver[];
  isLoading = true;
  dataSource: MatTableDataSource<Driver>;
  displayedColumns: string[] = [
    'position',
    'name',
    'addedDate',
    'licence',
    'rc',
    'insurance',
    'status',
    'action'
  ];

  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private driverService: DriverService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.driverList();
    this.dataSource = new MatTableDataSource(this.drivers);
  }

  driverList = () => {
    this.isLoading = true;
    this.getDriversList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      status: 'active',
      isSuspended: false,
      isDeleted: false,
      isRejected: false
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDriversList = filters => {
    this.driverService.detailedList(filters).subscribe(
      (drivers: ApiPage) => {
        this.isLoading = false;
        this.pageSize = drivers.pageSize;
        this.total = drivers.total;
        this.pageIndex = drivers.pageNo - 1;
        this.drivers = drivers.items;
        if (this.drivers && !this.drivers.length) {
          this.toastrService.warning('No Records Found', '', {
            timeOut: 3000,
            tapToDismiss: true
          });
        }
      },
      err => {
        this.toastrService.error('Unable to Get List', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }

  updateDriver = (id, model) => {
    this.driverService.update(id, model).subscribe(
      data => {
        this.driverList();
      },
      err => {
        this.toastrService.error('Unable to update', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }

  openDocDialog(title, id, type, url): void {
    const dialogRef = this.dialog.open(DocumentsComponent, {
      width: '750px',
      height: '550px',
      data: { url: url, id: id, type: type, title: title }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }


  handlePage(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.driverList();
  }


  commentDialog(driver): void {
    const dialogRef = this.dialog.open(RejectComponent, {
      width: '450px',
      data: driver
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.isSuspended = true;
        this.updateDriver(result.id, result);
      }
    });
  }

}
