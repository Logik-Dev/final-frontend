import {Address} from './address';
import {Booking} from './booking';
import {Resource} from './resource';

export interface User extends Resource {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: Address;
  bookings?: Array<Booking>;
}
