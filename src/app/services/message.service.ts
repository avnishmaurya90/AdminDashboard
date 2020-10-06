import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messaging = firebase.messaging();
  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  getToken() {
    return firebase.messaging().getToken();
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      this.messageSource.next(payload);
    });
  }
}
