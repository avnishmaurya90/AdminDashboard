import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFareComponent } from './driver-fare.component';

describe('DriverFareComponent', () => {
  let component: DriverFareComponent;
  let fixture: ComponentFixture<DriverFareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverFareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
