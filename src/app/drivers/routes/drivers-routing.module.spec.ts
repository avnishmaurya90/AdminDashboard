import { DriversRoutingModule } from './drivers-routing.module';

describe('DriversRoutingModule', () => {
  let driversRoutingModule: DriversRoutingModule;

  beforeEach(() => {
    driversRoutingModule = new DriversRoutingModule();
  });

  it('should create an instance', () => {
    expect(driversRoutingModule).toBeTruthy();
  });
});
