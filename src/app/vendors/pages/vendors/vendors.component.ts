import { VendorService } from 'src/app/vendors/services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  tabIndex = 0;
  isLoading: boolean;
  stats: Stats;


  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getVendorStats();
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex = tabChangeEvent.index;
  }

  getVendorStats = () => {
    this.isLoading = true;
    this.vendorService.getStats()
      .subscribe((data: Stats) => {
        this.isLoading = false;
        this.stats = data;
      });
  }
}

class Stats {
  total: number;
  open: number;
  close: number;
  verified: number;
  unverified: number;
}
