import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Room} from '../../models/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room$: Observable<Room>;
  constructor(private roomService: RoomService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.room$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.roomService.findById(+params.get('id')))
    );
  }

}
