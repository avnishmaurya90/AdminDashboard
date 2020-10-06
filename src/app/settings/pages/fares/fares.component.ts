import { Component, OnInit } from '@angular/core';
import { Fare } from '../../models/fare';
import { FareService } from '../../services/fare.service';
import { City } from '../../../model/city';
import { Vendor } from '../../../vendors/models/vendor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fares',
  templateUrl: './fares.component.html',
  styleUrls: ['./fares.component.css']
})
export class FaresComponent implements OnInit {
  isLoading = false;
  city: City;
  vendor: Vendor;
  fare: Fare;
  vendorQuery: any;
  cities: City[];
  vendors: Vendor[];
  isCitySelected = false;
  isVendorSelected = false;
  isFormSubmission = false;
  constructor(
    private fareService: FareService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() { }

  onCitySelected(city: City, stepper: any) {
    stepper._steps._results[0].completed = true;
    this.isCitySelected = true;
    this.city = city;
    this.vendorQuery = {
      city: city.id,
      isSuspended: false
    };
    this.goForward(stepper);
  }

  onVendorSelected(vendor: Vendor, stepper: any) {
    stepper._steps._results[1].completed = true;
    this.isVendorSelected = true;
    this.vendor = vendor;
    this.goForward(stepper);
  }

  onFareSelected(fare: Fare) {
    this.isFormSubmission = true;
    this.fare = fare;
  }

  goBack(stepper: any) {
    stepper.previous();
  }

  goForward(stepper: any) {
    stepper.next();
  }

  submit(stepper: any) {
    this.isLoading = true;
    if (!this.fare) {
      this.isLoading = false;
      return this.toastrService.error('All fields are required', '', {
        timeOut: 3000,
        tapToDismiss: true
      });
    }
    if (
      (this.fare.type === 'F&b' || this.fare.type === 'Non F&b') &&
      (!this.fare.bonusPrice ||
        !this.fare.basePrice ||
        !this.fare.bonusLimit ||
        !this.fare.baseDistance ||
        !this.fare.perKilometerFare)
    ) {
      this.isLoading = false;
      return this.toastrService.error('All fields are required', '', {
        timeOut: 3000,
        tapToDismiss: true
      });
    }
    if (
      this.fare.type === 'eCommerce' &&
      (!this.fare.basePercent ||
        !this.fare.bonusPercentPrice ||
        !this.fare.basePercentPrice)
    ) {
      this.isLoading = false;
      return this.toastrService.error('All fields are required', '', {
        timeOut: 3000,
        tapToDismiss: true
      });
    }
    stepper.selectedIndex = 0;
    let fare: any;
    fare = this.fare;
    fare.city = this.city.id;
    fare.vendor = this.vendor.id;
    this.fareService.create(this.fare).subscribe(
      res => {
        this.isLoading = false;
        this.fare = new Fare({});
        this.city = new City({});
        this.vendor = new Vendor({});
        this.toastrService.success('Fare Created Successfully', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      },
      err => {
        this.isLoading = false;
        this.isLoading = false;
        this.fare = new Fare({});
        this.city = new City({});
        this.vendor = new Vendor({});
        this.toastrService.error(err, '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }
}
