import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Observable} from 'rxjs';
import {Room} from '../../models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room$: Observable<Room>;
  Arr = Array;
  constructor(private route: ActivatedRoute,
              private roomService: RoomService) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.room$ = this.roomService.findById(params.get('id')));
  }

}

