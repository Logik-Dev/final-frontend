import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../models/room';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, flatMap, map, mergeAll} from 'rxjs/operators';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  user: User;
  Arr = Array;
  @Input() room: Room;
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.user = this.us.currentUser.value;
  }

  isFavorite(id: number): boolean {
    const favorite = this.user.favorites.filter(room => room.id === id);
    return favorite.length === 1;
  }

  setFavorite(id: number) {
      if (this.isFavorite(id)) {
        this.user.favorites = this.user.favorites.filter(room => room.id !== id);
      } else {
        this.user.favorites.push({id});
      }
      this.user.favorites = this.user.favorites.map(room => {
        return {id: room.id };
      });
      this.us.update(this.user).subscribe(user => this.user = user);
    }

}
