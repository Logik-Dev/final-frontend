import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-profil-favorite',
  templateUrl: './profil-favorite.component.html',
  styleUrls: ['./profil-favorite.component.scss']
})
export class ProfilFavoriteComponent implements OnInit {
  user: User;
  constructor(private us: UserService) {
    this.user = this.us.currentUser.value;
  }

  ngOnInit(): void {


  }

}
