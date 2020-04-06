import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Room} from '../../models/room';
import {RoomService} from '../../services/room.service';
import {AuthService} from '../../services/auth.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-profil-room',
  templateUrl: './profil-room.component.html',
  styleUrls: ['./profil-room.component.scss']
})
export class ProfilRoomComponent implements OnInit {
  rooms$: Observable<Room[]>;
  constructor(private roomService: RoomService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.rooms$ = this.roomService.findByUser(this.auth.getUserId())
      .pipe(catchError(error => of(null)));
  }

}
