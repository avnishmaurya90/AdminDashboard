import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../models/organization';
import { FileService } from '../../../services/file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site-configuration',
  templateUrl: './site-configuration.component.html',
  styleUrls: ['./site-configuration.component.css']
})
export class SiteConfigurationComponent implements OnInit {
  siteForm: FormGroup;
  logo: string;
  submitted = false;
  isLoading = false;
  org: Organization;
  @ViewChild('file')
  file;
  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private fileService: FileService,
    private toastrService: ToastrService
  ) {
    this.isLoading = true;
    this.getOrgDetails();
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

  mappingData(organization: Organization) {
    this.org = organization;
    this.logo = this.org.logoUrl;
    this.siteForm.patchValue({
      info: this.org.info,
      logoUrl: this.org.logoUrl,
      facebook: this.org.socialLinks.facebook,
      twitter: this.org.socialLinks.twitter,
      linkedin: this.org.socialLinks.linkedin,
      googleAnalytics: this.org.googleAnalytics,
      field1: this.org.seoMetaTags.field1,
      field2: this.org.seoMetaTags.field2,
      field3: this.org.seoMetaTags.field3
    });
  }

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
      info: ['', Validators.required],
      logoUrl: ['', Validators.required],
      facebook: ['', Validators.required],
      linkedin: ['', Validators.required],
      twitter: ['', Validators.required],
      googleAnalytics: ['', Validators.required],
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required]
    });
  }

  get f() {
    return this.siteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.siteForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.org.info = this.siteForm.value.info;
    this.org.logoUrl = this.siteForm.value.logoUrl;
    this.org.socialLinks.facebook = this.siteForm.value.facebook;
    this.org.socialLinks.linkedin = this.siteForm.value.linkedin;
    this.org.socialLinks.twitter = this.siteForm.value.twitter;
    this.org.googleAnalytics = this.siteForm.value.googleAnalytics;
    this.org.seoMetaTags.field1 = this.siteForm.value.field1;
    this.org.seoMetaTags.field2 = this.siteForm.value.field2;
    this.org.seoMetaTags.field3 = this.siteForm.value.field3;
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

  onFileAdded(event) {
    this.isLoading = true;
    this.fileService
      .create(this.file.nativeElement.files[0], { container: 'images' })
      .subscribe(
        res => {
          this.siteForm.patchValue({
            logoUrl: res.data.url
          });
          this.logo = res.data.url;
          this.isLoading = false;
        },
        err => {
          this.toastrService.error('Unable to Upload File', '');
          this.isLoading = false;
        }
      );
  }
}
