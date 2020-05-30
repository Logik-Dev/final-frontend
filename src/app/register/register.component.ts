import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {comparePasswords} from '../../utils/validators';
import {Observable} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, map} from 'rxjs/operators';
import {NotificationService} from '../../services/notification.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private us: UserService,
              private router: Router,
              private notification: NotificationService) {
  }


  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Créer le formulaire
   */
  createForm(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(8)]],
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: this.emailAvailable(),
        updateOn: 'blur'})
    }, {
      validator: [comparePasswords]
    });
  }

  /**
   * Validateur de disponibilité de l'adresse mail
   */
  emailAvailable(): AsyncValidatorFn {
    return (emailControl: AbstractControl): Observable<ValidationErrors | null> => {
      const email = emailControl.value;
      return this.us.exists({email}).pipe(
        map(response => response.result ? {emailExists: true} : null)
      );
    };
  }

  /**
   * Enregistrer l'utilisateur
   * @param data les données du formulaire
   */
  onSubmit(data: User) {
    if (this.registerForm.valid) {
      this.us.create(data).subscribe(
        user => this.router.navigate(['/connexion'])
          .then(_ => this.notification.showSuccess('Merci pour votre enregistrement, vous pouvez maintenant vous connecter'))
      );
    }
  }

  /**
   * Accesseurs
   */
  get f() {
    return this.registerForm.controls;
  }
}
