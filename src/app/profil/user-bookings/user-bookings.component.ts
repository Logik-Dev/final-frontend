import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../models/user';
import {TimeSlot} from '../../../models/time-slot';
import {DATE_FORMAT, TIME_FORMAT} from '../../../utils/dates';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {Booking} from '../../../models/booking';
import {CommentDialogComponent} from './comment-dialog/comment-dialog.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  user$: BehaviorSubject<User>;
  displayedColumns: string[] = ['salle', 'commence le', 'termine le', 'heure de début', 'heure de fin', 'commenter'];
  @ViewChildren('dialogButtons') dialogButtons: QueryList<MatButton>;

  constructor(private us: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
  }

  getFirstDate(timeSlots: TimeSlot[]) {
    const filtered = timeSlots.reduce((slot1, slot2) => {
      return slot1.start < slot2.start ? slot1 : slot2;
    });
    return moment(filtered.start).format(DATE_FORMAT);
  }

  getLastDate(timeSlots: TimeSlot[]) {
    const filtered = timeSlots.reduce((slot1, slot2) => {
      return slot1.end > slot2.end ? slot1 : slot2;
    });
    return moment(filtered.end).format(DATE_FORMAT);
  }

  getStartHour(timeSlots: TimeSlot[]) {
    return moment(timeSlots[0].start).format(TIME_FORMAT);
  }

  getEndHour(timeSlots: TimeSlot[]) {
    return moment(timeSlots[0].end).format(TIME_FORMAT);
  }

  openDialog(booking: Booking) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: {
        lastDate: this.getLastDate(booking.slots),
        userId: this.user$.value.id,
        roomId: booking.room.id
      },
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(_ =>
      this.dialogButtons.forEach(b => b._getHostElement().classList.remove('cdk-program-focused')));
  }

}
