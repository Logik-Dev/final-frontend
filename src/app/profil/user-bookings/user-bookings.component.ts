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

  /**
   * Obtenir la date de début de la réservation
   * @param timeSlots les TimeSlot de la réservation
   */
  getFirstDate(timeSlots: TimeSlot[]): string {
    const filtered = timeSlots.reduce((slot1, slot2) => {
      return slot1.start < slot2.start ? slot1 : slot2;
    });
    return moment(filtered.start).format(DATE_FORMAT);
  }

  /**
   * Obtenir la date de fin de la réservation
   * @param timeSlots les TimeSlot de la réservation
   */
  getLastDate(timeSlots: TimeSlot[]): string {
    const filtered = timeSlots.reduce((slot1, slot2) => {
      return slot1.end > slot2.end ? slot1 : slot2;
    });
    return moment(filtered.end).format(DATE_FORMAT);
  }

  /**
   * Obtenir l'heure de début de la réservation
   * @param timeSlots les TimeSlot de la réservation
   */
  getStartHour(timeSlots: TimeSlot[]): string {
    return moment(timeSlots[0].start).format(TIME_FORMAT);
  }

  /**
   * Obtenir l'heure de fin de la réservation
   * @param timeSlots les TimeSlot de la réservation
   */
  getEndHour(timeSlots: TimeSlot[]): string {
    return moment(timeSlots[0].end).format(TIME_FORMAT);
  }

  /**
   * Ouvrir la dialog commentaire
   * @param booking la réservation concernée
   */
  openDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: {
        lastDate: this.getLastDate(booking.slots),
        userId: this.user$.value.id,
        roomId: booking.room.id
      },
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(_ => this.clearIconFocus());
  }

  /**
   * Supprimer le focus des icones après fermeture de la dialog
   */
  clearIconFocus(): void {
    this.dialogButtons.forEach(b => b._getHostElement().classList.remove('cdk-program-focused'));
  }
}
