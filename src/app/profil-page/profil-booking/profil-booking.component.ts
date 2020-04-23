import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-profil-booking',
  templateUrl: './profil-booking.component.html',
  styleUrls: ['./profil-booking.component.scss']
})
export class ProfilBookingComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {

  }
}
