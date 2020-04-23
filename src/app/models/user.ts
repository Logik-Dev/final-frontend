import {Address} from './address';
import {Booking} from './booking';
import {Resource} from './resource';
import {Room} from './room';

export interface User extends Resource {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: Address;
  bookings?: Array<Booking>;
  rooms?: Array<Room>;
}
