import { Component, OnInit } from '@angular/core';
import {RoomService} from '../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Room} from '../models/room';

@Component({
  selector: 'app-search-room-page',
  templateUrl: './search-room-page.component.html',
  styleUrls: ['./search-room-page.component.scss']
})
export class SearchRoomPageComponent implements OnInit {
  rooms$: Observable<Room[]>;
  city: string;
  constructor(private roomService: RoomService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.city = params.get('city');
      const date = params.get('date');
      this.rooms$ = this.roomService.findRooms(this.city, date);
    });
  }

}
