import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fare } from '../../../settings/models/fare';

@Component({
  selector: 'app-fandb-fare-form',
  templateUrl: './fandb-fare-form.component.html',
  styleUrls: ['./fandb-fare-form.component.css']
})
export class FandbFareFormComponent implements OnInit {
  fandB: Fare = new Fare({});
  @Input()
  type: string;
  @Output()
  fandBEvent = new EventEmitter<Fare>();

  constructor() { }

  ngOnInit() {
    this.fandB.type = this.type;
  }

  onFandBSelection() {
    this.fandBEvent.emit(this.fandB);
  }
}
