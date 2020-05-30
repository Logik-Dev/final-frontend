import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private us: UserService,
              private location: Location) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Créer le formulaire
   */
  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Connexion et redirection
   * @param data les données du formulaire
   */
  onSubmit(data): void {
    if (this.loginForm.valid) {
      this.us.login(data.email, data.password)
        .subscribe(_ => this.location.back());
    }
  }
}
