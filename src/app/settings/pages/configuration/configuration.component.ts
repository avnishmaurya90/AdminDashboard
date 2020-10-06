import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  constructor() { }
  tabIndex = 0;
  ngOnInit() { }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.tabIndex = tabChangeEvent.index;
  }
}
