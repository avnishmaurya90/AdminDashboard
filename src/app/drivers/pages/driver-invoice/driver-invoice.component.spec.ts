import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInvoiceComponent } from './driver-invoice.component';

describe('DriverInvoiceComponent', () => {
  let component: DriverInvoiceComponent;
  let fixture: ComponentFixture<DriverInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
