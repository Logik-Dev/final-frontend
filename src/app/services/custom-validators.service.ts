import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {debounceTime, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BookingService} from './booking.service';

@Injectable({providedIn: 'root'})
export class CustomValidatorsService {

  constructor(private userService: UserService,
              private bookingService: BookingService) {
  }

  comparePasswords(passwordControlName: string, passwordCheckControlName: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[passwordControlName];
      const passwordCheckControl = formGroup.controls[passwordCheckControlName];

      if (passwordCheckControl.errors && !passwordCheckControl.errors.mustMatch) {
        return;
      }
      if (passwordControl.value !== passwordCheckControl.value) {
        passwordCheckControl.setErrors({mustMatch: true});
      } else {
        passwordCheckControl.setErrors(null);
      }
    };
  }

  dayAvailable(dateControlName: string, availableDays: string[]) {
    return (formGroup: FormGroup) => {
      const dateControl = formGroup.controls[dateControlName];
      const englishDay = dateControl.value && dateControl.value.locale('en').format('dddd').toUpperCase();
      if (dateControl.errors && dateControl.errors.dayUnavailable) {
        return;
      }

      if (availableDays.includes(englishDay)) {
        dateControl.setErrors(null);
      } else {
        dateControl.setErrors({dayUnavailable: true});
      }

    };
  }

  emailAvailable(): AsyncValidatorFn {
    return (emailControl: AbstractControl): Observable<ValidationErrors | null> => {
      const email = emailControl.value;
      return this.userService.emailExists(email).pipe(
        debounceTime(800),
        map(response => response.result ? {emailExists: true} : null)
      );
    };
  }

  dateAvailable(roomId: number): AsyncValidatorFn {
  return (f: FormGroup): Observable<ValidationErrors | null> => {
      const ftr = 'DD/MM/YYYY';
      const startDate = f.get('startDate').value.format(ftr);
      const endDate = f.get('endDate').value && f.get('endDate').value.format(ftr);
      const startTime = f.get('startTime').value;
      const endTime = f.get('endTime').value;
      if (!startTime || !endTime || !startDate) {
        return;
      }
      const begin = `${startDate} ${startTime}`;
      const end = f.get('weekly').value ? `${endDate} ${endTime}` : `${startDate} ${endTime}`;
      return this.bookingService.isAvailable(begin, end, f.get('weekRepetition').value, roomId)
        .pipe(debounceTime(800),
          map(response => response.result ? null : {isUnavailable: true}));
    };
  }
}
