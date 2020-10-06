import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Fare } from '../../../settings/models/fare';

@Component({
  selector: 'app-non-fand-b-fare-form',
  templateUrl: './non-fand-b-fare-form.component.html',
  styleUrls: ['./non-fand-b-fare-form.component.css']
})
export class NonFandBFareFormComponent implements OnInit {
  eCommerce: Fare = new Fare({});
  @Input()
  type: string;
  @Output()
  nonFandBEvent = new EventEmitter<Fare>();

  constructor() { }

  ngOnInit() {
    this.eCommerce.type = this.type;
  }

  onNonFandBSelection() {
    this.nonFandBEvent.emit(this.eCommerce);
  }
}
