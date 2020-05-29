import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Room} from '../../../models/room';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profil-favorite',
  templateUrl: './profil-favorite.component.html',
  styleUrls: ['./profil-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilFavoriteComponent implements OnInit {
  rooms$: Observable<Room[]>;
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.rooms$ = this.us.currentUser.pipe(
      map(user => user.favorites)
    );
  }

}
