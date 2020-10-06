import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedVendorListComponent } from './suspended-vendor-list.component';

describe('SuspendedVendorListComponent', () => {
  let component: SuspendedVendorListComponent;
  let fixture: ComponentFixture<SuspendedVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedVendorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
