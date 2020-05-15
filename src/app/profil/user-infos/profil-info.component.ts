import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent implements OnInit {
  user$: BehaviorSubject<User>;
  form: FormGroup;
  constructor(private fb: FormBuilder, private us: UserService) {

  }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      firstname: [this.user$.value.firstname, Validators.required],
      lastname: [this.user$.value.lastname, Validators.required],
      email: [this.user$.value.email, [Validators.required, Validators.email]],
      password: ['', []],
      passwordCheck: ['', []]
    });
  }
}
