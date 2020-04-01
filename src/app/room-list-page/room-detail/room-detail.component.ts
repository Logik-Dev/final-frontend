import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Room} from '../../models/room';
import {AuthService} from '../../services/auth.service';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room$: Observable<Room>;
  availableDays: string[];
  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              public auth: AuthService,
              public dates: DateService) { }

  ngOnInit(): void {
    this.room$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.roomService.findById(+params.get('id')).pipe(
          tap(room =>  this.availableDays = this.dates.sortDays(room.availableDays))
        ))
    );
  }

}
