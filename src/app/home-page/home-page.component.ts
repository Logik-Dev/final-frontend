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
  cities: City[];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              private geoService: GeoService,
              private router: Router,
              private roomService: RoomService) {
    this.adapter.setLocale('fr');
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      date: null
    });
  }

  ngOnInit(): void {
    this.searchForm.get('city').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.geoService.findCityByName(value))
    ).subscribe(cities => this.cities = cities);
  }

  submitForm(formData) {
    if (!formData.city.nom) {
      return;
    }
    if (!this.searchForm.invalid) {
      const city = formData.city.nom;
      const zipCode = formData.city.codesPostaux[0];
      console.log(zipCode);
      const date = formData.date;
      this.roomService.findRooms(city, zipCode, date && date.format('DD/MM/YYYY')).subscribe(
        rooms => this.router.navigateByUrl('/salles', {state: {rooms, city, date: date && date.locale('fr').format('LL')}})
      );
    }
  }
  displayCity(city: City) {
    return city.nom;
  }

}
