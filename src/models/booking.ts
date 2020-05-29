import {Resource} from './resource';
import {TimeSlot} from './time-slot';
import {Room} from './room';
import {User} from './user';

export interface Booking extends Resource {
  id?: number;
  slots: TimeSlot[];
  price: number;
  client: User;
  room: Room;


}
