import {Equipment} from './equipment';
import {Resource} from './resource';

export interface RoomEquipment extends Resource{
  id?: number;
  equipment: Equipment;
  quantity?: number;
}
