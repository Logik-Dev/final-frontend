import { Component, OnInit } from '@angular/core';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room-list-page',
  templateUrl: './room-list-page.component.html',
  styleUrls: ['./room-list-page.component.scss']
})
export class RoomListPageComponent implements OnInit {
  rooms: Room[];
  city;
  date;
  Arr = Array;
  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.rooms = history.state.rooms;
    this.city = history.state.city;
    this.date = history.state.date;
    if (!this.rooms) {
      this.roomService.findRooms().subscribe(
        rooms => this.rooms = rooms
      );
    }
  }

}
