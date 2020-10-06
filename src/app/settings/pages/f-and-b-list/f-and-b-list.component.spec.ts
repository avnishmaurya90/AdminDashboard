import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAndBListComponent } from './f-and-b-list.component';

describe('FAndBListComponent', () => {
  let component: FAndBListComponent;
  let fixture: ComponentFixture<FAndBListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAndBListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAndBListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
