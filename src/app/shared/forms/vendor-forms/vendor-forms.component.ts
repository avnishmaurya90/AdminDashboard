import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { VendorService } from '../../../vendors/services/vendor.service';
import { ApiPage } from '../../../model';
import { Vendor } from '../../../vendors/models/vendor';

@Component({
  selector: 'app-vendor-forms',
  templateUrl: './vendor-forms.component.html',
  styleUrls: ['./vendor-forms.component.css']
})
export class VendorFormsComponent implements OnInit, OnChanges {
  vendors: Vendor[];
  vendor: Vendor;

  @Input()
  query: any = {};
  @Output()
  vendorEvent = new EventEmitter<Vendor>();

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    // this.getVendors();
  }

  ngOnChanges() {
    this.getVendors();
  }

  onVendorSelected(vendor: Vendor) {
    this.vendor = vendor;
    this.vendorEvent.emit(this.vendor);
  }

  getVendors() {
    this.vendorService.list(this.query).subscribe((res: ApiPage) => {
      this.vendors = res.items;
    });
  }
}
