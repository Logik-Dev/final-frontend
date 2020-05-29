import {Serializer} from '../models/serializer';
import {RoomEquipment} from '../models/room-equipment';

export class RoomEquipmentSerializer implements Serializer {
  fromJson(json: any): RoomEquipment {
    return json;
  }
  toJson(equipment: any): any {
    const e = {id: equipment.id, custom: equipment.custom};
    equipment.equipment = e;
    delete equipment.id;
    return equipment;
  }
}
