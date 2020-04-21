import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../models/booking';
import {ResourceService} from './resource.service';
import {BookingSerializer} from '../utils/booking-serializer';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends ResourceService<Booking> {
  constructor(http: HttpClient) {
    super(
      http,
      'bookings',
      new BookingSerializer()
    );
  }
}
