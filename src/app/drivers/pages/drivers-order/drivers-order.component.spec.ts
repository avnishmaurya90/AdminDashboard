import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversOrderComponent } from './drivers-order.component';

describe('DriversOrderComponent', () => {
  let component: DriversOrderComponent;
  let fixture: ComponentFixture<DriversOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
