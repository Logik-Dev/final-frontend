import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-profil-notification',
  templateUrl: './profil-notification.component.html',
  styleUrls: ['./profil-notification.component.scss']
})
export class ProfilNotificationComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
