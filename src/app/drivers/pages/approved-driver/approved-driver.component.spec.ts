import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDriverComponent } from './approved-driver.component';

describe('ApprovedDriverComponent', () => {
  let component: ApprovedDriverComponent;
  let fixture: ComponentFixture<ApprovedDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
