export class Panel {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  type: string;
  email: string;
  mobile: string;
  token: string;
  authorization: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  constructor(entity) {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.name = entity.name;
    this.type = entity.type;
    this.email = entity.email;
    this.mobile = entity.mobile;
    this.token = entity.token;
    this.authorization = entity.authorization;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isDeleted = entity.isDeleted;
  }
}
