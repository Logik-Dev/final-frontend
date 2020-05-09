import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../services/room.service';
import {Observable} from 'rxjs';
import {Room} from '../models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room$: Observable<Room>;
  Arr = Array;
  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.room$ = this.roomService.findById(params.get('id')));
  }


}
