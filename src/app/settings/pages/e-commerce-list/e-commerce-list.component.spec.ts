import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceListComponent } from './e-commerce-list.component';

describe('ECommerceListComponent', () => {
  let component: ECommerceListComponent;
  let fixture: ComponentFixture<ECommerceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECommerceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
