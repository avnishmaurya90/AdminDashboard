import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FandbFareFormComponent } from './fandb-fare-form.component';

describe('FandbFareFormComponent', () => {
  let component: FandbFareFormComponent;
  let fixture: ComponentFixture<FandbFareFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FandbFareFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FandbFareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
