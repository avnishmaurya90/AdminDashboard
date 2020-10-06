import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListGraphComponent } from './vendor-list-graph.component';

describe('VendorListGraphComponent', () => {
  let component: VendorListGraphComponent;
  let fixture: ComponentFixture<VendorListGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorListGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorListGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
