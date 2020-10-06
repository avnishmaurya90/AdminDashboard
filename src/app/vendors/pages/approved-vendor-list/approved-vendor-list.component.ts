import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';
import { ApiPage } from 'src/app/model';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { City } from 'src/app/model/city';
import { CityService } from 'src/app/services/city.service';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../models/vendor';
import { RejectComponent } from 'src/app/drivers/dialogs/reject/reject.component';

@Component({
  selector: 'app-approved-vendor-list',
  templateUrl: './approved-vendor-list.component.html',
  styleUrls: ['./approved-vendor-list.component.css']
})
export class ApprovedVendorListComponent implements OnInit, AfterViewInit {
  vendors: Vendor[];
  isLoading = true;
  dataSource: MatTableDataSource<Vendor>;
  displayedColumns: string[] = [
    'position',
    'name',
    'city',
    'category',
    'email',
    'mobile',
    'addedDate',
    'dutyStatus',
    'status',
    'action'
  ];
  city: City;
  name: string;
  type: string;

  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private vendorService: VendorService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private cityService: CityService,
    // private categoryService: CategoryService
  ) { }

  onCitySelected(city: City) {
    this.city = city;
  }
  ngOnInit() {
    this.vendorList();
    this.cityList();
    // this.categoryList();
    this.dataSource = new MatTableDataSource(this.vendors);
  }

  vendorList = () => {
    this.isLoading = true;
    this.getVendorsList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      status: 'active',
      isSuspended: false
    });
  }

  cityList() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getVendorsList = filters => {
    this.vendorService.list(filters).subscribe(
      (vendors: ApiPage) => {
        this.isLoading = false;
        this.pageSize = vendors.pageSize;
        this.total = vendors.total;
        this.pageIndex = vendors.pageNo - 1;
        this.vendors = vendors.items;
        if (this.vendors && !this.vendors.length) {
          this.toastrService.info('No Records Found', '', { timeOut: 3000 });
        }
      },
      err => {
      }
    );
  }

  updateVendor = (id, model) => {
    this.vendorService.update(id, model).subscribe(
      data => {
        this.vendorList();
      },
      err => {
      }
    );
  }

  commentDialog(vendor): void {
    const dialogRef = this.dialog.open(RejectComponent, {
      width: '450px',
      data: vendor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.isSuspended = true;
        this.updateVendor(result.id, result);
      }
    });
  }



  handlePage(e: any) {
    this.isLoading = true;
    const pageNoIncrement = e.pageIndex;
    this.getVendorsList({ pageSize: e.pageSize, pageNo: pageNoIncrement + 1 });
  }
}
