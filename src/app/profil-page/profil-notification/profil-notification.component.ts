import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-profil-notification',
  templateUrl: './profil-notification.component.html',
  styleUrls: ['./profil-notification.component.scss']
})
export class ProfilNotificationComponent implements OnInit {
  @Input() user: User;
  bookings: Booking[] = [];
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    if (this.user.bookingNotifications.length) {
        this.user.bookingNotifications.forEach(
          id => this.bookingService.findById(id).subscribe(
            booking => this.bookings.push(booking)
          )
        );
    }
  }

  get pending() {
    return this.bookings.filter(booking => booking.status === 'PENDING');
  }
  get confirmed() {
    return this.bookings.filter(booking => booking.status === 'CONFIRMED');
  }
}
