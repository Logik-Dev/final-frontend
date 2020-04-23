import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss']
})
export class ProfilPageComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.userService.findById(this.auth.getUserId()).subscribe(
      user => this.user = user
    );
  }

}
