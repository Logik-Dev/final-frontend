import {Component} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public notification: NotificationService) {
  }
  title = 'final';

}
