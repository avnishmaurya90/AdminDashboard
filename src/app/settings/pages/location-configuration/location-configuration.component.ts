import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../models/organization';

@Component({
  selector: 'app-location-configuration',
  templateUrl: './location-configuration.component.html',
  styleUrls: ['./location-configuration.component.css']
})
export class LocationConfigurationComponent implements OnInit {
  locationForm: FormGroup;
  submitted = false;
  isLoading = false;
  org: Organization;
  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService
  ) {
    this.isLoading = true;
    this.getOrgDetails();
  }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  mappingData(organization: Organization) {
    this.org = organization;
    this.locationForm.patchValue({
      street: this.org.address.street,
      city: this.org.address.city,
      district: this.org.address.district,
      state: this.org.address.state,
      pinCode: this.org.address.pinCode
    });
  }

  getOrgDetails = () => {
    this.organizationService.get().subscribe(
      (res: Organization) => {
        this.isLoading = false;
        this.mappingData(res);
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  get f() {
    return this.locationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.org.address = this.locationForm.value;
    this.organizationService.update(this.org.id, this.org).subscribe(
      (res: Organization) => {
        this.isLoading = false;
        this.mappingData(res);
      },
      err => {
        this.isLoading = false;
      }
    );
  }
}
