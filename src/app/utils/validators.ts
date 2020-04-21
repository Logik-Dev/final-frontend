import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Room} from '../models/room';
import {Moment} from 'moment';
import * as moment from 'moment';
import {TimeSlot} from '../models/time-slot';
import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from './dates';
import {BookingSerializer} from './booking-serializer';


export const dayAvailable = (availableDays: string[]): ValidatorFn => {
  return (dateControl: AbstractControl): ValidationErrors | null => {
    const day = dateControl.value && dateControl.value.locale('fr').format('dddd');
    return availableDays.includes(day) ? null : {dayUnavailable: true};
  };
}

export const datePassed = (): ValidatorFn  => {
  return (dateControl: AbstractControl): ValidationErrors | null => {
    return moment(dateControl.value).isBefore(moment()) ? {datePassed: true} : null;
  };
}

export const hoursValid = (): ValidatorFn => {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const start = parseFloat(formGroup.get('startTime').value.replace(':', '.'));
    const end = parseFloat(formGroup.get('endTime').value.replace(':', '.'));
    const difference = end - start;
    return difference >= 1 && difference % 1 === 0 ? null : {hoursInvalid: true};
  };
};
export const dateAvailable = (room: Room): ValidatorFn => {
  return (f: FormGroup): ValidationErrors | null => {
    const start: Moment = f.get('startDate').value;
    const end: Moment = f.get('weekRepetition').value > 0 ? f.get('endDate').value : start;
    const begin: Moment = f.get('startTime').value && moment(f.get('startTime').value, TIME_FORMAT);
    const finish: Moment = f.get('endTime').value && moment(f.get('endTime').value, TIME_FORMAT);
    const weekly = f.get('weekRepetition').value;
    if (!start || !end || !begin || !finish) {
      return null;
    }
    const slots = new BookingSerializer().getSlots(start, end, begin, finish, weekly);
    return isAvailable(room, slots) ? null : {dateUnavailable: true};

  };
};
const isAvailable = (room: Room, slots: TimeSlot[]): boolean => {
  let result = null;
  room.bookings.forEach(booking => booking.slots.forEach(roomSlot =>
      slots.forEach(s => {
        if (s.start.isSame(roomSlot.start) || s.end.isSame(roomSlot.end)) {
          result = false;
        } else if (s.start.isBefore(roomSlot.end) && s.end.isAfter(roomSlot.start)) {
          result = false;
        }
      })
    )
  );
  return result !== false;
};

