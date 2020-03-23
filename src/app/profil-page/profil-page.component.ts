import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss']
})
export class ProfilPageComponent implements OnInit {
  user$: Observable<User>;
  constructor(private userService: UserService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUserInfos();
  }

  logout() {
    this.auth.logout();
  }
}
