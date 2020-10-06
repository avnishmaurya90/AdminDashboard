import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-fare',
  templateUrl: './driver-fare.component.html',
  styleUrls: ['./driver-fare.component.css']
})
export class DriverFareComponent implements OnInit {
  isLoading: boolean;
  showFilter: boolean;
  constructor() { }

  ngOnInit() {
  }

}
