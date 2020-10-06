import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFormsComponent } from './vendor-forms.component';

describe('VendorFormsComponent', () => {
  let component: VendorFormsComponent;
  let fixture: ComponentFixture<VendorFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
