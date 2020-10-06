import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { NavItem } from '../../model/nav-item';
import { NavService } from '../../services/nav.service';
import { NavItemsService } from 'src/app/services/nav-items.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav')
  sidenav: ElementRef;
  events: string[] = [];
  opened = true;
  mobileQuery: MediaQueryList;
  navItems: any;
  subscription: Subscription;
  showNavMenu = true;
  showSideNav = false;
  openMenu = true;
  private _mobileQueryListener: () => void;
  constructor(private navService: NavService, private navItemsService: NavItemsService, private router: Router) {
    this.openMenu = true;
    this.showNavMenu = true;
    router.events.subscribe(
      event => event instanceof NavigationEnd && this.handleRouteChange()
    );
  }

  handleRouteChange = () => {
    switch (this.router.url) {
      case '/login':
        this.showSideNav = false;
        break;
      default:
        this.showSideNav = true;
    }
  }

  ngOnInit() {
    this.getNavList();
  }
  close() {
    this.navService.closeNav();
  }

  open() {
    this.navService.openNav();
  }

  getNavList() {
    this.subscription = this.navItemsService.getNavItemsList()
      .subscribe(navItems => {
        this.navItems = navItems;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
    this.navService.sidenav = this.sidenav;
  }
}
