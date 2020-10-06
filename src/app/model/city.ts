export class City {
  id: string;
  name: string;

  constructor(entity) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
