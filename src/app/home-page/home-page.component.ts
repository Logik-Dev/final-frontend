import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {GeoService} from '../services/geo.service';
import {City} from '../models/city';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cities$: Observable<City[]>;
  searchForm: FormGroup;
  startDate = moment();
  rooms$: Observable<Room[]>;

  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              private geoService: GeoService,
              private roomService: RoomService) {
    this.adapter.setLocale('fr');
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      date: moment()
    });
  }

  ngOnInit(): void {
    this.cities$ = this.searchForm.get('city').valueChanges.pipe(
      debounceTime(800),
      switchMap(value => this.geoService.findCityByName(value))
    );
  }

  submitForm(formData) {
    if (!formData.invalid) {
      this.rooms$ = this.roomService.findRooms(formData.city.nom, formData.date.format('DD/MM/YYYY'));
    }
  }
  displayCity(city: City) {
    console.log(city);
    return city.nom;
  }
}
