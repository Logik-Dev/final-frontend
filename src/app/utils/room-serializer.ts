import {Serializer} from '../models/serializer';
import {Room} from '../models/room';
import {CommentSerializer} from './comment-serializer';
import {BookingSerializer} from './booking-serializer';
import {UserSerializer} from './user-serializer';

export class RoomSerializer implements Serializer {

  fromJson(json: any): Room {
    const room = {...json};
    room.comments = json.comments ? json.comments.map(comment => new CommentSerializer().fromJson(comment)) : [];
    room.bookings = json.bookings ? json.bookings.map(booking => new BookingSerializer().fromJson(booking)) : [];
    room.owner = json.owner && new UserSerializer().fromJson(json.owner);
    return room;
  }

  toJson(room: Room): Room {
    return room;
  }

}
