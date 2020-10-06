import { NavItemsService } from './../../services/nav-items.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Notification, ApiPage } from '../../model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  showNavMenu = true;
  openMenu = true;
  headerText: string;
  showHeader = true;
  subscription: Subscription;
  user: any;
  notifications: Notification[] = [];

  constructor(
    private navService: NavService,
    private router: Router,
    private toastrService: ToastrService,
    private panelService: PanelService,
    private notificationService: NotificationService,
    private navItemsService: NavItemsService
  ) {
    this.openMenu = true;
    this.showNavMenu = true;
    router.events.subscribe(
      event => event instanceof NavigationEnd && this.handleRouteChange()
    );
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('vendor'));
    this.navItemsService.updateNavItemsList(localStorage.getItem('userType'));
    this.subscription = this.navService.getMessage().subscribe(message => {
      this.openMenu = message;
      this.getNotifications();
    });
  }

  handleRouteChange = () => {
    this.user =
      JSON.parse(localStorage.getItem('user')) ||
      JSON.parse(localStorage.getItem('vendor'));
    const id = this.router.url.split('/').pop();
    switch (this.router.url) {
      case '/users/list':
        this.headerText = 'Customers List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/drivers':
        this.headerText = 'Drivers List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/drivers/order':
        this.headerText = 'Driver Orders List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/drivers/status':
        this.headerText = 'Driver Duty Status List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/drivers/invoice':
        this.headerText = 'Driver Invoice List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/home':
        this.headerText = 'Dashboard';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/notifications':
        this.headerText = 'Notifications';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/vendors':
        this.headerText = 'Vendors List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/map':
        this.headerText = 'Map View';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/settings/fares/list':
        this.headerText = 'Fares List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/vendors/list/graph':
        this.headerText = 'Vendors List';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/fares':
        this.headerText = 'Fare Create';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case `/fares/${id}`:
        this.headerText = 'Fare Update';
        this.showNavMenu = true;
        this.showHeader = true;
        this.open();
        break;
      case '/login':
        this.headerText = '';
        this.showNavMenu = false;
        this.showHeader = false;
        break;
      default:
        this.showNavMenu = true;
        this.open();
    }
  }

  // close() {
  //   this.navService.closeNav();
  // }

  logout() {
    const device = {
      id: 'string',
      type: 'web',
      token: 'string'
    };
    this.panelService.logout(device).subscribe(
      () => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.toastrService.success('Logout Successfully', '', {
          timeOut: 3000
        });
      },
      err => {
        this.toastrService.error('Unable to logout', '', {
          timeOut: 3000
        });
      }
    );
  }

  getNotifications() {
    this.notificationService
      .list({ isRead: false })
      .subscribe((res: ApiPage) => {
        this.notifications = res.items;
      });
  }

  markRead() {
    this.notificationService.markRead({}).subscribe(() => {
      this.getNotifications();
    });
  }

  open() {
    this.navService.openNav();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
