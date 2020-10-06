import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NavItem } from '../../model/nav-item';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { NavItemsService } from 'src/app/services/nav-items.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class NavBarComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded')
  ariaExpanded = this.expanded;
  @Input()
  item: NavItem;
  @Input()
  depth: number;
  toolTipDisable = false;

  constructor(public navService: NavService,
    private navItemsService: NavItemsService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    if (this.depth) {
      this.toolTipDisable = true;
    }
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navItemsService.updateNavItemsList(localStorage.getItem('userType'));
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
