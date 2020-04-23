
import {Photo} from './photo';
import {Address} from './address';
import {RoomType} from './room-type';
import {Comment} from './comment';
import {Resource} from './resource';
import {Equipment} from './equipment';
import {Booking} from './booking';
import {User} from './user';

export interface Room extends Resource {
  id?: number;
  price?: number;
  size?: number;
  name?: string;
  address?: Address;
  maxCapacity?: number;
  availableDays?: Array<string>;
  type?: RoomType;
  equipments?: Array<Equipment>;
  rating?: number;
  photos?: Array<Photo>;
  comments?: Array<Comment>;
  bookings?: Booking[];
  owner?: User;
}
