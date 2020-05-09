import { Component, OnInit } from '@angular/core';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  Arr = Array;
  user: User;
  constructor(private roomService: RoomService, private route: ActivatedRoute, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.roomService.findAll(params).subscribe(rooms => this.rooms = rooms)
    );
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.currentUser.value;
    }
  }

  sortRooms(filter: string) {
    this.rooms.sort((a, b) => b[filter] - a[filter]);
  }

  isFavorite(id: number): boolean {
    if (this.user) {
      return this.user.favorites.filter(room => room.id === id).length === 1;
    }
  }
  setFavorite(id: number) {
    if (this.user) {
      const user = {id: this.user.id, favorites: this.user.favorites};
      if (this.isFavorite(id)) {
        user.favorites = user.favorites.filter(room => room.id !== id);
      } else {
        user.favorites.push({id});
      }
      user.favorites = user.favorites.map(room => {
        return {id: room.id };
      });
      this.userService.update(user)
        .subscribe(newUser => {
          this.auth.currentUser.next(newUser);
          this.user = newUser;
        });
    }
  }
}
