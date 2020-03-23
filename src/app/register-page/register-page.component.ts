import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {CustomValidatorsService} from '../services/custom-validators.service';


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
              private validator: CustomValidatorsService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.validator.emailAvailable()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: [this.validator.comparePasswords('password', 'passwordCheck')]
    });
  }
  onSubmit(data: User) {
    this.submitted = true;
    if (!this.registerForm.invalid)  {
      this.userService.register(data).subscribe(
        user => this.router.navigate(['/profil'])
      );
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
