import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareEditComponent } from './fare-edit.component';

describe('FareEditComponent', () => {
  let component: FareEditComponent;
  let fixture: ComponentFixture<FareEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
