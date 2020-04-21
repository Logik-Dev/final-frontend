import {Serializer} from '../models/serializer';
import {TimeSlot} from '../models/time-slot';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from './dates';

export class TimeSlotSerializer implements Serializer {
  fromJson(json: any): TimeSlot {
    return {
      id: json.id,
      start: moment(json.start, DATE_TIME_FORMAT).locale('fr'),
      end: moment(json.end, DATE_TIME_FORMAT).locale('fr')
    };
  }

  toJson(timeSlot: TimeSlot): any {
    return {
      id: timeSlot.id,
      start: timeSlot.start.format(DATE_TIME_FORMAT),
      end: timeSlot.end.format(DATE_TIME_FORMAT)
    };
  }

}
