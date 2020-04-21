import {Serializer} from '../models/serializer';
import {Booking} from '../models/booking';
import {TimeSlotSerializer} from './time-slot-serializer';
import * as moment from 'moment';
import {Moment} from 'moment';
import {TimeSlot} from '../models/time-slot';
import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from './dates';

export class BookingSerializer implements Serializer {
  fromJson(json: any): Booking {
    const booking: Booking = {...json};
    booking.slots = json.slots.map(slot => new TimeSlotSerializer().fromJson(slot));
    return booking;
  }

  toJson(booking: Booking): any {
    const json = {...booking};
    json.slots = booking.slots.map(slot => new TimeSlotSerializer().toJson(slot));
    return json;
  }

  getSlots(start: Moment, end: Moment, begin: Moment, finish: Moment, weekly: number): TimeSlot[] {
    const slots: TimeSlot[] = [];
    let date = start;
    if (weekly > 0) {
      while (date <= end) {
        slots.push({start: date, end: date});
        const nextDate = moment(date).add(weekly * 7, 'days');
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
      slot.start = this.concat(slot.start, begin);
      slot.end = this.concat(slot.end, finish);
    });
    return slots;
  }

  private concat(start, end): Moment {
    return moment(start.format(DATE_FORMAT) + ' ' + end.format(TIME_FORMAT), DATE_TIME_FORMAT).locale('fr');
  }

}
