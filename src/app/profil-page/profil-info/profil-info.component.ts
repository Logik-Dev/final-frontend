import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent implements OnInit {
  @Input() user: User;
  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

}
