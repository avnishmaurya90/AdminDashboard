export class Site {
  accuracy: number;
  device_id: string;
  internet: boolean;
  latitude: number;
  longitude: number;
  speed: number;
  time: number;

  constructor(entity) {
    this.accuracy = entity.accuracy;
    this.device_id = entity.device_id;
    this.internet = entity.internet;
    this.latitude = entity.latitude;
    this.longitude = entity.longitude;
    this.speed = entity.speed;
    this.time = entity.time;
  }
}

export class Gps {
  gpsStatus: boolean;
  location_mode: string;
  time: string;

  constructor(entity) {
    this.gpsStatus = entity.gpsStatus;
    this.location_mode = entity.location_mode;
    this.time = entity.time;
  }
}

export class OnSite {
  driver_id: string;
  userName: string;
  Last_Location: Site;

  constructor(entity) {
    this.driver_id = entity.driver_id;
    this.userName = entity.userName;
  }
}
