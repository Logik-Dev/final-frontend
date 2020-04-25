import { Component, OnInit } from '@angular/core';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  Arr = Array;
  constructor(private roomService: RoomService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.roomService.findAll(params).subscribe(rooms => this.rooms = rooms)
    );
  }

  sortRooms(filter: string) {
    this.rooms.sort((a, b) => b[filter] - a[filter]);
  }
}
