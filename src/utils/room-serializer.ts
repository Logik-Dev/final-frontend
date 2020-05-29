import {Serializer} from '../models/serializer';
import {Room} from '../models/room';
import {CommentSerializer} from './comment-serializer';
import {BookingSerializer} from './booking-serializer';
import {UserSerializer} from './user-serializer';
import {RoomEquipmentSerializer} from './room-equipment-serializer';

export class RoomSerializer implements Serializer {

  fromJson(json: any): Room {
    const room = {...json};
    room.comments = json.comments ? json.comments.map(comment => new CommentSerializer().fromJson(comment)) : [];
    room.bookings = json.bookings ? json.bookings.map(booking => new BookingSerializer().fromJson(booking)) : [];
    return room;
  }

  toJson(room: Room): Room {
    room.equipments = room.equipments.map(equipment => new RoomEquipmentSerializer().toJson(equipment));
    return room;
  }

}
