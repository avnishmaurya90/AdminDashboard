import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FareService } from '../../services/fare.service';
import { Fare } from '../../models/fare';

@Component({
  selector: 'app-f-and-b-list',
  templateUrl: './f-and-b-list.component.html',
  styleUrls: ['./f-and-b-list.component.css']
})
export class FAndBListComponent implements OnInit {
  constructor(private fareService: FareService, private router: Router) { }
  fares: Fare[] = [];
  isLoading: boolean;
  dataSource: MatTableDataSource<Fare>;
  displayedColumns: string[] = [
    'position',
    'city',
    'vendor',
    'type',
    'basePrice',
    'bonusLimit',
    'bonusPrice',
    'baseDistance',
    'perKilometerFare',
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
      type: 'F&B'
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
