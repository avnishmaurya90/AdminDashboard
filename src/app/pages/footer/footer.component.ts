import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  showFooter = true;

  constructor(private router: Router) {
    router.events.subscribe(
      event => event instanceof NavigationEnd && this.handleRouteChange()
    );
  }

  ngOnInit() {
  }

  handleRouteChange = () => {
    switch (this.router.url) {
      case '/login':
        this.showFooter = false;
        break;
      default:
        this.showFooter = true;
    }
  }

}
