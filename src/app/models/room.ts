
import {Photo} from './photo';
import {Address} from './address';
import {RoomType} from './room-type';

export interface Room {
  id: number;
  price: number;
  size: number;
  name: string;
  address: Address;
  maxCapacity: number;
  availableDays: string[];
  type: RoomType;
  equipments: string[];
  rating: number;
  photos: Photo[];
  comments: Comment[];
}
