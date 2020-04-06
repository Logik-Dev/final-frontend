import {Address} from './address';
import {Booking} from './booking';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: Address;
  bookingNotifications: number[];
  bookings: Booking[];
}
