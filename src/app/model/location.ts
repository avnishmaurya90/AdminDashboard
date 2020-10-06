export class Location {
  type: string;
  coordinates: any[];

  constructor(entity) {
    this.type = entity.type;
    this.coordinates = entity.coordinates;
  }
}
