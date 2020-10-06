import { Invoice } from './../../../model/invoice';
import { PanelService } from './../../../services/panel.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ApiPage } from 'src/app/model';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-driver-invoice',
  templateUrl: './driver-invoice.component.html',
  styleUrls: ['./driver-invoice.component.css']
})
export class DriverInvoiceComponent implements OnInit {
  showFilter: boolean;
  isLoading: boolean;
  searchInvoiceCode: FormControl = new FormControl();
  constructor(private panelService: PanelService,
    private toastrService: ToastrService, ) {
    this.isLoading = true;
    this.searchInvoiceCode.valueChanges
      .subscribe(data => {
        this.code = data;
        this.invoiceList();
      });
  }

  invoices: Invoice[];
  maxDate = new Date(new Date());
  minDate = new Date(2018, 8, 1);
  date = '';
  code = '';
  type = 'driverOrder';
  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;
  paginator: MatPaginator;


  ngOnInit() {
    this.invoiceList();
  }

  invoiceList() {
    this.getInvoiceList({
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      createdAt: this.date,
      code: this.code,
      type: this.type
    });
  }

  getInvoiceList(filters) {
    this.panelService.invoicesList(filters)
      .subscribe(
        (invoices: ApiPage) => {
          this.isLoading = false;
          this.pageSize = invoices.pageSize;
          this.total = invoices.total;
          this.pageIndex = invoices.pageNo - 1;
          this.invoices = invoices.items;
        },
        err => {
          this.toastrService.error('Unable to Get List', '', {
            timeOut: 3000,
            tapToDismiss: true
          });
        });
  }

  handlePage(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.invoiceList();
  }

}
