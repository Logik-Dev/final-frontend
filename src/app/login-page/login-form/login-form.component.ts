import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.loginForm = fb.group({
      email: '',
      password: ''
    });
  }
  login(formData) {
    this.authService.login(formData.email, formData.password);
  }
  ngOnInit(): void {
  }

}
