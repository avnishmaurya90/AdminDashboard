import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavItemsService {

  adminNavItems = environment.adminNavItems;
  vendorNavItems = environment.vendorNavItems;

  private navItems = new Subject<any>();

  constructor() { }

  updateNavItemsList = (userType: string) => {
    switch (userType) {
      case 'admin': {
        this.navItems.next(this.adminNavItems);
        break;
      }
      case 'vendor': {
        this.navItems.next(this.vendorNavItems);
        break;
      }
      default:
        this.navItems.next(this.adminNavItems);
    }
  }

  getNavItemsList(): Observable<any> {
    return this.navItems.asObservable();
  }
}
