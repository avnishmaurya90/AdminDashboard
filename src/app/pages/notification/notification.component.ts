import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification, ApiPage } from '../../model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  isLoading = false;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getNotifications();
  }
  getNotifications() {
    this.notificationService.list({}).subscribe(
      (res: ApiPage) => {
        this.isLoading = false;
        this.notifications = res.items;
      },
      err => {
        this.isLoading = false;
      }
    );
  }
}
