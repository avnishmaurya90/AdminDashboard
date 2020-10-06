import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonFAndBListComponent } from './non-f-and-b-list.component';

describe('NonFAndBListComponent', () => {
  let component: NonFAndBListComponent;
  let fixture: ComponentFixture<NonFAndBListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFAndBListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFAndBListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
