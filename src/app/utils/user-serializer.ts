import {Serializer} from '../models/serializer';
import {User} from '../models/user';
import {BookingSerializer} from './booking-serializer';
import {RoomSerializer} from './room-serializer';

export class UserSerializer implements Serializer {
  fromJson(json: any): User {
    const user: User = {...json};
    user.bookings = json.bookings ? json.bookings.map(booking => new BookingSerializer().fromJson(booking)) : [];
    user.rooms = json.rooms ? json.rooms.map(room => new RoomSerializer().fromJson(room)) : [];
    return user;
  }

  toJson(user: User): any {
    return user;
  }

}
