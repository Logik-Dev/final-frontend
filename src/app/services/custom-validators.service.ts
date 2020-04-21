import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {debounceTime, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class CustomValidatorsService {

  constructor(private userService: UserService) {
  }

  comparePasswords(passwordControlName: string, passwordCheckControlName: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[passwordControlName];
      const passwordCheckControl = formGroup.controls[passwordCheckControlName];

      if (passwordControl.value !== passwordCheckControl.value) {
        passwordCheckControl.setErrors({mustMatch: true});
      } else {
        passwordCheckControl.setErrors(null);
      }
    };
  }

  dayAvailable(availableDays: string[]): ValidatorFn {
    return (dateControl: AbstractControl): ValidationErrors | null => {
      const day = dateControl.value && dateControl.value.locale('fr').format('dddd');
      return availableDays.includes(day) ? null : {dayUnavailable: true};
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

  cityInvalid(): ValidatorFn {
    return (cityControl: AbstractControl): ValidationErrors | null => {
      return !cityControl.value.nom || !cityControl.value.codesPostaux ? {cityInvalid: true} : null;
    };
  }

  addressInvalid(): ValidatorFn {
    return (addressControl: AbstractControl): ValidationErrors | null => {
      return addressControl.value.properties && !addressControl.value.properties.name ? {addressInvalid: true} : null;
    };
  }





}
