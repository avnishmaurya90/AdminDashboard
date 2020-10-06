class Docs {
  licence: string;
  drivingLicence: string;
  customPapers: string;
  constructor(entity) {
      this.licence = entity.licence;
      this.drivingLicence = entity.drivingLicence;
      this.customPapers = entity.customPapers;
  }
}

export class Vehicle {
  id: string;
  number: string;
  color: string;
  type: string;
  model: string;
  make: string;
  licence: string;
  driverLicence: string;
  docs: Docs;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  constructor(entity) {
    this.id = entity.id;
    this.number = entity.number;
    this.color = entity.color;
    this.type = entity.type;
    this.model = entity.model;
    this.make = entity.make;
    this.licence = entity.licence;
    this.driverLicence = entity.driverLicence;
    this.docs = entity.docs;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isDeleted = entity.isDeleted;
  }
}
