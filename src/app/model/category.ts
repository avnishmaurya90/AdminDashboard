export class Category {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.isDeleted = entity.isDeleted;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
