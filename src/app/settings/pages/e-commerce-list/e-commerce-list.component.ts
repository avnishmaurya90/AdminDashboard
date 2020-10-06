import { Component, OnInit } from '@angular/core';
import { Fare } from '../../models/fare';
import { MatTableDataSource } from '@angular/material';
import { FareService } from '../../services/fare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-commerce-list',
  templateUrl: './e-commerce-list.component.html',
  styleUrls: ['./e-commerce-list.component.css']
})
export class ECommerceListComponent implements OnInit {
  constructor(private fareService: FareService, private router: Router) { }
  fares: Fare[] = [];
  isLoading: boolean;
  dataSource: MatTableDataSource<Fare>;
  displayedColumns: string[] = [
    'position',
    'city',
    'vendor',
    'type',
    'basePercentPrice',
    'basePercent',
    'bonusPercentPrice',
    'edit'
  ];

  public pageSize = 10;
  public pageIndex = 1;
  public total = 0;

  ngOnInit() {
    this.getFaresList();
  }

  getFaresList() {
    const query = {
      pageSize: this.pageSize,
      pageNo: this.pageIndex,
      type: 'eCommerce'
    };
    this.isLoading = true;
    this.fareService.list(query).subscribe(
      (fares: Fare[]) => {
        this.fares = fares;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  handlePage(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getFaresList();
  }

  goToFareCreate() {
    return this.router.navigate(['/fares']);
  }
}
