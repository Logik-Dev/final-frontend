import {Resource} from './resource';
import * as moment from 'moment';

export interface TimeSlot extends Resource {
  id?: number;
  start: moment.Moment;
  end: moment.Moment;
}
