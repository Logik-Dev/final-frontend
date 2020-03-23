import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {debounceTime, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CustomValidatorsService {

  constructor(private userService: UserService) {
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

  emailAvailable(): AsyncValidatorFn {
    return (emailControl: AbstractControl): Observable<ValidationErrors | null> => {
      const email = emailControl.value;
      return this.userService.emailExists(email).pipe(
        debounceTime(800),
        map(response => response.result ? {emailExists: true} : null)
      );
    };
  }
}
