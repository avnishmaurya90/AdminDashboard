export class Device {
  id: string;
  type: string;
  token: string;

  constructor(entity) {
    this.id = entity.id;
    this.type = entity.type;
    this.token = entity.token;
  }
}
