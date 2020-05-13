import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../models/room';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  user$: BehaviorSubject<User>;
  Arr = Array;
  @Input() room: Room;
  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
  }


  isFavorite(id: number): boolean {
    const favorite = this.user$.value.favorites.filter(room => room.id === id);
    return favorite.length === 1;

  }
  setFavorite(id: number) {
    if (this.user$.value) {
      const user = {id: this.user$.value.id, favorites: this.user$.value.favorites};
      if (this.isFavorite(id)) {
        user.favorites = user.favorites.filter(room => room.id !== id);
      } else {
        user.favorites.push({id});
      }
      user.favorites = user.favorites.map(room => {
        return {id: room.id };
      });
      this.us.update(user).subscribe(_ => this.ngOnInit());
    }
  }

}
