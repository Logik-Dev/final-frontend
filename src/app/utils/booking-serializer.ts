import {Serializer} from '../models/serializer';
import {Booking} from '../models/booking';
import {TimeSlotSerializer} from './time-slot-serializer';

export class BookingSerializer implements Serializer {
  fromJson(json: any): Booking {
    const booking: Booking = {...json};
    booking.slots = json.slots ? json.slots.map(slot => new TimeSlotSerializer().fromJson(slot)) : [];
    return booking;
  }

  toJson(booking: Booking): any {
    const json = {...booking};
    json.slots = booking.slots.map(slot => new TimeSlotSerializer().toJson(slot));
    return json;
  }
}
