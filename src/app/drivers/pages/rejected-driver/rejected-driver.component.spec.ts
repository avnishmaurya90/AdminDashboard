import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDriverComponent } from './rejected-driver.component';

describe('RejectedDriverComponent', () => {
  let component: RejectedDriverComponent;
  let fixture: ComponentFixture<RejectedDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
