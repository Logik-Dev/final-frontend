import { Component, OnInit } from '@angular/core';
import {Room} from '../models/room';

@Component({
  selector: 'app-room-list-page',
  templateUrl: './room-list-page.component.html',
  styleUrls: ['./room-list-page.component.scss']
})
export class RoomListPageComponent implements OnInit {
  rooms: Room[];
  city;
  date;
  constructor() { }

  ngOnInit(): void {
    this.rooms = history.state.rooms;
    this.city = history.state.city;
    this.date = history.state.date;
  }

}
