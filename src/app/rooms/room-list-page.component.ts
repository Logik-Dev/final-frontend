import {Component, OnInit} from '@angular/core';
import {Room} from '../../models/room';
import {RoomService} from '../../services/room.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
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
  search = new FormControl('');
  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              private us: UserService) {
  }

  ngOnInit(): void {
    this.searchChangeListener();
    this.user$ = this.us.currentUser;
    this.route.params.subscribe(
      params => this.rooms$ = this.roomService.findAll(params)
    );
  }

  /**
   * Surveiller l'input de la barre de recherche et faire les requêtes
   */
  searchChangeListener() {
    this.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => this.findRoom(value)
    );
  }

  /**
   * Rechercher une salle
   * @param query le mot recherché
   */
    findRoom(query: string) {
    if (query) {
      this.rooms$ = this.roomService.search(query);
    }
  }

  /**
   * Trier les salles
   * @param prop la propriété sur laquelle on effectue le tri
   * @param direction asc ou desc
   */
  sort(prop: string, direction: 'asc' | 'desc') {
    this.rooms$ = this.rooms$.pipe(
      map(rooms => rooms.sort(this.ascOrDesc(prop)[direction])
    ));
  }

  /**
   * Retourne un obect contenant deux fonctions de tri: asc et desc
   * @param prop propriété de l'objet pour effectuer le tri
   */
  ascOrDesc(prop: string) {
    return {
      asc: (a, b)  => a[prop] - b[prop],
      desc: (a, b)  => b[prop] - a[prop]
    };
  }
}
