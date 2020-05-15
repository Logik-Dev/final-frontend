import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../models/room';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, flatMap, map, mergeAll} from 'rxjs/operators';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  user: User;
  Arr = Array;
  @Input() room: Room;
  constructor(private us: UserService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.user = this.us.currentUser.value;
  }

  isFavorite(id: number): boolean {
    if (this.user) {
      const favorite = this.user.favorites.filter(room => room.id === id);
      return favorite.length === 1;
    }

  }

  setFavorite(id: number) {
    if (this.user) {
      const userToUpdate = {id: this.user.id, favorites: this.user.favorites};
      if (this.isFavorite(id)) {
        userToUpdate.favorites = userToUpdate.favorites.filter(room => room.id !== id);
      } else {
        userToUpdate.favorites.push({id});
      }
      userToUpdate.favorites = userToUpdate.favorites.map(room => {
        return {id: room.id};
      });
      this.us.update(userToUpdate).subscribe(user => this.user = user);
    }

  }

}
