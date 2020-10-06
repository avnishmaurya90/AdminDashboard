import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDriversComponent } from './live-drivers.component';

describe('LiveDriversComponent', () => {
  let component: LiveDriversComponent;
  let fixture: ComponentFixture<LiveDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
