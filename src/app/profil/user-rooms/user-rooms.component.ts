import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {RoomService} from '../../services/room.service';
import {NotificationService} from '../../services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {Room} from '../../models/room';

@Component({
  selector: 'app-user-rooms',
  templateUrl: './user-rooms.component.html',
  styleUrls: ['./user-rooms.component.scss']
})
export class UserRoomsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'size', 'address', 'bookings', 'actions'];
  user$: BehaviorSubject<User>;
  rooms$: Observable<Room[]>;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;

  constructor(private us: UserService,
              private roomService: RoomService,
              private notification: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
    this.fetchRooms();
  }

  fetchRooms() {
    this.rooms$ = this.roomService.findByChildId(this.user$.value.id);
  }

  onClickDelete(id: number) {
    this.dialog.open(this.confirmDialog, {data: id});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  deleteRoom(id: number) {
    console.log('roomId: ', id);
    this.roomService.delete(id).subscribe(_ => {
      this.notification.showSuccess('Salle supprimée');
      this.closeDialog();
      this.fetchRooms();
    });
  }
}
