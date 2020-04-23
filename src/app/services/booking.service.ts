import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../models/booking';
import {ResourceService} from './resource.service';
import {BookingSerializer} from '../utils/booking-serializer';
import { Moment} from 'moment';
import * as moment from 'moment';
import {TimeSlot} from '../models/time-slot';
import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from '../utils/dates';
import {environment} from '../../environments/environment';

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

  static concatDateTime(start, end): Moment {
    return moment(start.format(DATE_FORMAT) + ' ' + end.format(TIME_FORMAT), DATE_TIME_FORMAT).locale('fr');
  }

  static getSlots(start: Moment, end: Moment, begin: Moment, finish: Moment, weekly: number): TimeSlot[] {
    const slots: TimeSlot[] = [];
    let date = start;
    if (weekly > 0) {
      while (date <= end) {
        slots.push({start: date, end: date});
        const nextDate = moment(date).add(weekly, 'week');
        if (nextDate > end) {
          break;
        } else {
          date = nextDate;
        }
      }
    } else {
      slots.push({start, end: start});
    }
    slots.forEach(slot => {
      slot.start = BookingService.concatDateTime(slot.start, begin);
      slot.end = BookingService.concatDateTime(slot.end, finish);
    });
    return slots;
  }

  getPrice(booking: Booking, roomPrice: number): number {
    const hours = moment.duration(booking.slots[0].end.diff(booking.slots[0].start)).asHours();
    let total = hours * roomPrice * booking.slots.length;
    total += total / environment.COMMISSION;
    return parseFloat(total.toFixed(1));
  }

}
