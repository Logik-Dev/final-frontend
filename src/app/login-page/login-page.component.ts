import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private location: Location) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(data) {
    if (!this.loginForm.invalid) {
      this.auth.login(data.email, data.password)
        .subscribe(_ => this.location.back());
    }
  }
}
