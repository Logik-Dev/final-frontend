import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss']
})
export class ProfilPageComponent implements OnInit {
  user$: Observable<User>;
  navLinks = [
    {path: '/profil/infos', label: 'Infos'},
    {path: '/profil/favoris', label: 'Favoris'}
  ];
  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
  }

}
