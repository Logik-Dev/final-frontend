import { Component, OnInit } from '@angular/core';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
interface ParamMap {
  params: any;
}
@Component({
  selector: 'app-room-list-page',
  templateUrl: './room-list-page.component.html',
  styleUrls: ['./room-list-page.component.scss']
})
export class RoomListPageComponent implements OnInit {
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
