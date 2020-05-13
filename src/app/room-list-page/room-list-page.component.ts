import {Component, OnInit} from '@angular/core';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list-page.component.html',
  styleUrls: ['./room-list-page.component.scss']
})
export class RoomListPageComponent implements OnInit {
  rooms$: Observable<Room[]>;
  Arr = Array;
  user$: BehaviorSubject<User>;
  form: FormGroup;

  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              private us: UserService,
              private fb: FormBuilder,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.user$ = this.us.currentUser;
    this.rooms$ = this.route.params.pipe(
      switchMap(params => this.roomService.findAll(params)));
  }

  createForm() {
    this.form = this.fb.group({
      search: ['']
    });
  }

  isFavorite(id: number): boolean {
    const favorites = this.user$.value.favorites.filter(room => room.id === id);
    return favorites.length === 1;
  }

  setFavorite(id: number) {
    if (this.user$.value) {
      const user = {id: this.user$.value.id, favorites: this.user$.value.favorites};
      if (this.isFavorite(id)) {
        user.favorites = user.favorites.filter(room => room.id !== id);
      } else {
        user.favorites.push({id});
      }
      user.favorites = user.favorites.map(room => {
        return {id: room.id};
      });
      this.us.update(user)
        .subscribe(_ => this.ngOnInit());
    } else {
        this.notification.showError('Connectez vous pour ajouter une salle à vos favoris');
    }
  }
}
