import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {comparePasswords} from '../utils/validators';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private notification: NotificationService) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
        asyncValidators: this.emailAvailable(),
        updateOn: 'blur'
      }),
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: [comparePasswords]
    });
  }

  onSubmit(data: User) {
    this.submitted = true;
    if (!this.registerForm.invalid) {
      this.userService.create(data).subscribe(
        user => this.router.navigate(['/profil'])
          .then(_ => this.notification.showSuccess('Merci pour votre enregistrement, vous pouvez maintenant vous connecter'))
      );
    }
  }

  emailAvailable(): AsyncValidatorFn {
    return (emailControl: AbstractControl): Observable<ValidationErrors | null> => {
      const email = emailControl.value;
      return this.userService.exists({email}).pipe(
        map(response => response.result ? {emailExists: true} : null)
      );
    };
  }
}
