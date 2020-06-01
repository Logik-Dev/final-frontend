import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Room} from '../../../models/room';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profil-favorite',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFavoritesComponent implements OnInit {
  rooms$: Observable<Room[]>;
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.rooms$ = this.us.currentUser.pipe(
      map(user => user.favorites)
    );
  }

}
