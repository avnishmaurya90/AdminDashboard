import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingVendorListComponent } from './pending-vendor-list.component';

describe('PendingVendorListComponent', () => {
  let component: PendingVendorListComponent;
  let fixture: ComponentFixture<PendingVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingVendorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
