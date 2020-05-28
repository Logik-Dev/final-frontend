import {AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Room} from '../models/room';
import {Moment} from 'moment';
import * as moment from 'moment';
import {TimeSlot} from '../models/time-slot';
import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from './dates';
import {BookingSerializer} from './booking-serializer';
import {BookingService} from '../services/booking.service';


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
    const slots = BookingService.getSlots(start, end, begin, finish, weekly);
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

export const cityInvalid = (): ValidatorFn => {
  return (cityControl: AbstractControl): ValidationErrors | null => {
    return !cityControl.value.nom || !cityControl.value.codesPostaux ? {cityInvalid: true} : null;
  };
};

export const addressInvalid = (): ValidatorFn => {
  return (addressControl: AbstractControl): ValidationErrors | null => {
    return addressControl.value.properties && !addressControl.value.properties.name ? {addressInvalid: true} : null;
  };
};

export const comparePasswords = (): ValidatorFn => {
  return (formGroup: FormGroup) => {
    const password = formGroup.get('password').value;
    const passwordCheck = formGroup.get('passwordCheck').value;
    return password !== passwordCheck ? {mustMatch: true} : null;
  };
};

export const isSelectedValidator = (array: FormArray): ValidatorFn => {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const id = formControl.value;
    const filtered = array.value.filter(v => v.id === id);
    return filtered.length > 0 ? {isSelected: true} : null;
  };
};
