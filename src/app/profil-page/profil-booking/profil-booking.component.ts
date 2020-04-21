import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';

interface DisplayedBooking {
  start: string;
  end: string;
  begin: string;
  finish: string;
}

@Component({
  selector: 'app-profil-booking',
  templateUrl: './profil-booking.component.html',
  styleUrls: ['./profil-booking.component.scss']
})
export class ProfilBookingComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
    if (this.user) {
      console.log(this.user.bookings);
    }

  }
}
