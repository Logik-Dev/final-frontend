import {Component, OnInit} from '@angular/core';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


@Component({
  selector: 'app-room-list-page',
  templateUrl: './room-list-page.component.html',
  styleUrls: ['./room-list-page.component.scss']
})
export class RoomListPageComponent implements OnInit {
  rooms$: Observable<Room[]>;
  user$: BehaviorSubject<User>;
  form: FormGroup;

  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              private us: UserService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.user$ = this.us.currentUser;
    this.route.params.subscribe(
      params => this.rooms$ = this.roomService.findAll(params)
    );
  }

  createForm() {
    this.form = this.fb.group({
      search: ['']
    });
    this.form.controls.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => this.search(value)
    );
  }

  search(query: string) {
    if (query) {
      this.rooms$ = this.roomService.search(query);
    }
  }

  sort(prop: string, direction: string) {
    this.rooms$ = this.rooms$.pipe(
      map(rooms => rooms.sort(this.operators(prop)[direction])
    ));
  }
  operators(prop: string) {
    return {
      asc: (a, b)  => a[prop] - b[prop],
      desc: (a, b)  => b[prop] - a[prop]
    };
  }
}
