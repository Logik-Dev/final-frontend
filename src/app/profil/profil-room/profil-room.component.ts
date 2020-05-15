import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Room} from '../../models/room';
import {RoomService} from '../../services/room.service';
import {catchError} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profil-room',
  templateUrl: './profil-room.component.html',
  styleUrls: ['./profil-room.component.scss']
})
export class ProfilRoomComponent implements OnInit {
  rooms$: Observable<Room[]>;
  constructor(private roomService: RoomService,
              private us: UserService) { }

  ngOnInit(): void {
    this.rooms$ = this.roomService.findByChildId(this.us.userId)
      .pipe(catchError(error => of(null)));
  }

}
