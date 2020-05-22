import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Room} from '../../models/room';

@Component({
  selector: 'app-profil-favorite',
  templateUrl: './profil-favorite.component.html',
  styleUrls: ['./profil-favorite.component.scss']
})
export class ProfilFavoriteComponent implements OnInit {
  rooms: Room[];
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.rooms = this.us.currentUser.value.favorites;
  }

}
