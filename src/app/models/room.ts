
import {Photo} from './photo';
import {Address} from './address';
import {RoomType} from './room-type';
import {Comment} from './comment';
import {Resource} from './resource';
import {Booking} from './booking';
import {User} from './user';
import {RoomEquipment} from './room-equipment';
import {EventType} from './event-type';

export interface Room extends Resource {
  id?: number;
  price?: number;
  size?: number;
  name?: string;
  address?: Address;
  maxCapacity?: number;
  maxVolume?: string;
  availableDays?: Array<string>;
  type?: RoomType;
  equipments?: Array<RoomEquipment>;
  eventTypes?: Array<EventType>;
  rating?: number;
  photos?: Array<Photo>;
  comments?: Array<Comment>;
  bookings?: Booking[];
  owner?: User;
}
