
import {Equipment} from './equipment';
import {Photo} from './photo';
import {Address} from './address';

export interface Room {
  id: number;
  price: number;
  size: number;
  address: Address;
  maxCapacity: number;
  type: string;
  equipments: Equipment[];
  rating: number;
  photos: Photo[];
  comments: Comment[];
}
