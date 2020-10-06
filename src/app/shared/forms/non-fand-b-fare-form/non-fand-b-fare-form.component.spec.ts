import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFandBFareFormComponent } from './non-fand-b-fare-form.component';

describe('NonFandBFareFormComponent', () => {
  let component: NonFandBFareFormComponent;
  let fixture: ComponentFixture<NonFandBFareFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFandBFareFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFandBFareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
