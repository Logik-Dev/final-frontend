import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {FormGroup} from '@angular/forms';
import {RoomTypeService} from '../../services/room-type.service';
import {Observable} from 'rxjs';
import {RoomType} from '../../models/room-type';
import {EventTypeService} from '../../services/event-type.service';
import {EventType} from '../../models/event-type';
import {EquipmentService} from '../../services/equipment.service';
import {Equipment} from '../../models/equipment';
import {GeoService} from '../../services/geo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  form: FormGroup;
  user$: Observable<User>;
  types$: Observable<RoomType[]>;
  events$: Observable<EventType[]>;
  equipments$: Observable<Equipment[]>;

  constructor(public us: UserService,
              private roomTypeService: RoomTypeService,
              private eventTypeService: EventTypeService,
              private equipmentService: EquipmentService,
              private geoService: GeoService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUser();
    this.fetchTypes();
    this.fetchEvents();
    this.fetchEquipments();
  }

  fetchUser() {
    this.user$ = this.us.currentUser;
  }

  fetchTypes() {
    this.types$ = this.roomTypeService.findAll();
  }

  fetchEvents() {
    this.events$ = this.eventTypeService.findAll();
  }

  fetchEquipments() {
    this.equipments$ = this.equipmentService.findAll();
  }

  aroundMe() {
    this.geoService.getPosition().subscribe(
      coords => this.router.navigate(['salles', coords])
        .then(_ => location.reload())
    );
  }

}
