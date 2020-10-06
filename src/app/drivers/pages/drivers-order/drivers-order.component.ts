import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { MatPaginator } from '@angular/material';
import { Order } from '../../../model/order';
import { ApiPage } from '../../../model';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-drivers-order',
  templateUrl: './drivers-order.component.html',
  styleUrls: ['./drivers-order.component.css']
})
export class DriversOrderComponent implements OnInit {
  maxDate = new Date(new Date());
  minDate = new Date(2018, 8, 1);
  date = '';
  orders: Order[];
  isLoading = true;
  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;
  code = '';
  status = '';
  isCOD = '';
  showFilter: boolean;
  type = 'driverOrder';
  searchOrder: FormControl = new FormControl();


  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private orderService: OrdersService,
    private toastrService: ToastrService
  ) {
    this.isLoading = true;
    this.searchOrder.valueChanges
      .subscribe(data => {
        this.code = data;
        this.orderList();
      });
  }

  ngOnInit() {
    this.orderList();
  }
  reset() {
    this.isCOD = '';
    this.status = '';
    this.code = '';
    this.date = '';
    this.orderList();
  }
  orderList = () => {
    this.isLoading = true;
    this.getOrderList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      code: this.code,
      status: this.status,
      isCOD: this.isCOD,
      createdAt: this.date,
      type: this.type
    });
  }

  getOrderList = filters => {
    this.orderService.list(filters).subscribe(
      (orders: ApiPage) => {
        this.isLoading = false;
        this.pageSize = orders.pageSize;
        this.total = orders.total;
        this.pageIndex = orders.pageNo - 1;
        this.orders = orders.items;
      },
      err => {
        this.toastrService.error('Unable to Get List', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }

  getPdf(code) {
    this.isLoading = true;
    return this.orderService.pdf(code).subscribe((res: any) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = code;
      document.body.appendChild(a);
      a.click();
      this.isLoading = false;
    });
  }

  handlePage(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.orderList();
  }
}
