import {AfterViewInit, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {RoomService} from '../../../services/room.service';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {Room} from '../../../models/room';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-user-rooms',
  templateUrl: './user-rooms.component.html',
  styleUrls: ['./user-rooms.component.scss']
})
export class UserRoomsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'size', 'address', 'bookings', 'actions'];
  user$: BehaviorSubject<User>;
  rooms$: Observable<Room[]>;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
  @ViewChildren('dialogButtons') dialogButtons: QueryList<MatButton>;

  constructor(private us: UserService,
              private roomService: RoomService,
              private notification: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
    this.fetchRooms();
  }

  ngAfterViewInit() {
    this.dialog.afterAllClosed.subscribe(_ =>
      this.dialogButtons.forEach(b => b._getHostElement().classList.remove('cdk-program-focused')));
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
    this.roomService.delete(id).subscribe(_ => {
      this.notification.showSuccess('Salle supprimée');
      this.closeDialog();
      this.fetchRooms();
    });
  }
}
