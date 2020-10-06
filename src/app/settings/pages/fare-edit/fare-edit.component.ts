import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FareService } from '../../services/fare.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fare-edit',
  templateUrl: './fare-edit.component.html',
  styleUrls: ['./fare-edit.component.css']
})
export class FareEditComponent implements OnInit {
  fare: any;
  isLoading: boolean;
  isFare = false;
  isFAndB = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fareService: FareService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.fareService.get(id).subscribe(fare => {
      this.isLoading = false;
      this.isFare = true;
      this.fare = fare;
      if (this.fare.type === 'F&B' || this.fare.type === 'Non F&B') {
        this.isFAndB = true;
      } else {
        this.isFAndB = false;
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (
      this.isFAndB &&
      (!this.fare ||
        !this.fare.bonusPrice ||
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
      !this.isFAndB &&
      (!this.fare ||
        !this.fare.basePercent ||
        !this.fare.bonusPercentPrice ||
        !this.fare.basePercentPrice)
    ) {
      this.isLoading = false;
      return this.toastrService.error('All fields are required', '', {
        timeOut: 3000,
        tapToDismiss: true
      });
    }
    this.fareService.update(this.fare.id, this.fare).subscribe(
      res => {
        this.isLoading = false;
        this.toastrService.success('Fare updated successfully', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
        this.gotoFareList();
      },
      err => {
        this.isLoading = false;
        this.toastrService.error('Failed to update fare', '', {
          timeOut: 3000,
          tapToDismiss: true
        });
      }
    );
  }

  gotoFareList() {
    return this.router.navigate(['/settings/fares/list']);
  }
}
