import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public sidenav: any;
  private message = new Subject<any>();
  constructor() { }
  public closeNav() {
    this.sidenav.close();
    this.message.next(false);
  }

  public openNav() {
    if (this.sidenav) {
      this.sidenav.open();
    }
    this.message.next(true);
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }
}
