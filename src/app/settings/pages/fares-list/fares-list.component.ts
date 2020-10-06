import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-fares-list',
  templateUrl: './fares-list.component.html',
  styleUrls: ['./fares-list.component.css']
})
export class FaresListComponent implements OnInit {
  constructor() { }
  tabIndex = 0;
  ngOnInit() { }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex = tabChangeEvent.index;
  }
}
