import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Room} from '../../models/room';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BookingService} from '../../services/booking.service';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  user$: BehaviorSubject<User>;
  favorite: boolean;
  Arr = Array;
  @Input() room: Room;

  constructor(private us: UserService,
              private notification: NotificationService) {
  }


  ngOnInit(): void {
    this.user$ = this.us.currentUser;
    this.favorite = this.isFavorite();
  }

  isFavorite(): boolean {
    if (this.user$.value) {
      const favorites = this.user$.value.favorites.filter(room => room.id === this.room.id);
      return favorites.length === 1;
    }

  }

  setFavorite() {
    if (this.user$.value) {
      this.favorite = !this.favorite;
      this.us.favorites({id: this.room.id}).subscribe();
    } else {
      this.notification.showError('Connectez vous pour ajouter cette salle à vos favoris');
    }

  }
  get price() {
    return BookingService.getUnitPrice(this.room.price);
  }
}
