import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactConfigurationComponent } from './contact-configuration.component';

describe('ContactConfigurationComponent', () => {
  let component: ContactConfigurationComponent;
  let fixture: ComponentFixture<ContactConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
