import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-contact-configuration',
  templateUrl: './contact-configuration.component.html',
  styleUrls: ['./contact-configuration.component.css']
})
export class ContactConfigurationComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  org: any;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService
  ) {
    this.isLoading = true;
    this.getOrgDetails();
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      webSite: ['', Validators.required],
      salesEmail: ['', [Validators.required, Validators.email]],
      infoEmail: ['', [Validators.required, Validators.email]],
      invoiceEmail: ['', [Validators.required, Validators.email]],
      helpline: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  mappingAddress(organization) {
    this.org = organization;
    this.contactForm.patchValue({
      webSite: this.org.contact.webSite,
      salesEmail: this.org.contact.salesEmail,
      infoEmail: this.org.contact.infoEmail,
      invoiceEmail: this.org.contact.invoiceEmail,
      helpline: this.org.contact.helpline
    });
  }

  getOrgDetails = () => {
    this.organizationService.get().subscribe(
      res => {
        this.isLoading = false;
        this.mappingAddress(res);
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.org.contact = this.contactForm.value;
    this.organizationService.update(this.org.id, this.org).subscribe(
      res => {
        this.isLoading = false;
        this.mappingAddress(res);
      },
      err => {
        this.isLoading = false;
      }
    );
  }
}
