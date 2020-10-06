import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { ApiPage } from '../../../model';
import { City } from '../../../model/city';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {
  cities: City[];
  city: City;
  @Output()
  cityEvent = new EventEmitter<City>();
  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.cityService.list({}).subscribe((res: ApiPage) => {
      this.cities = res.items;
    });
  }

  onCitySelection(city) {
    this.city = city;
    this.cityEvent.emit(city);
  }
}
