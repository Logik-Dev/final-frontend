import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {GeoService} from '../services/geo.service';
import {City} from '../models/city';
import {RoomService} from '../services/room.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cities$: Observable<City[]>;
  searchForm: FormGroup;
  startDate = moment();

  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              private geoService: GeoService,
              private router: Router,
              private roomService: RoomService) {
    this.adapter.setLocale('fr');
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      date: moment()
    });
  }

  ngOnInit(): void {
    this.cities$ = this.searchForm.get('city').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.geoService.findCityByName(value))
    );
  }

  submitForm(formData) {
    if (!this.searchForm.invalid) {
      const city = formData.city.nom;
      const date = formData.date;
      this.roomService.findRooms(city, date && date.format('DD/MM/YYYY')).subscribe(
        rooms => this.router.navigateByUrl('/salles', {state: {rooms, city, date: date && date.locale('fr').format('LL')}})
      );
    }
  }
  displayCity(city: City) {
    return city.nom;
  }
}
