import { Device } from './device';

export class Login {
  email: string;
  mobile: string;
  password: string;
  device: Device;

  constructor(entity) {
    this.email = entity.email;
    this.mobile = entity.mobile;
    this.password = entity.password;
    this.device = entity.device;
  }
}
