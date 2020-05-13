import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profil-favorite',
  templateUrl: './profil-favorite.component.html',
  styleUrls: ['./profil-favorite.component.scss']
})
export class ProfilFavoriteComponent implements OnInit {
  user$: Observable<User>;
  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
  }

}
