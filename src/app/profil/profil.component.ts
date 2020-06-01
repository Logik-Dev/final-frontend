import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user$: Observable<User>;
  navLinks = [
    {path: '/profil/infos', label: 'Infos'},
    {path: '/profil/favoris', label: 'Favoris'},
    {path: '/profil/salles', label: 'Mes salles'},
    {path: '/profil/réservations', label: 'Mes réservations'}
  ];
  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
  }

}
