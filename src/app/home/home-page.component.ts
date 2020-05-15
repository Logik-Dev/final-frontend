import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import {debounceTime, switchMap} from 'rxjs/operators';
import {GeoService} from '../services/geo.service';
import {City} from '../models/city';
import {Router} from '@angular/router';
import {DATE_FORMAT} from '../utils/dates';
import * as moment from 'moment';
import {NotificationService} from '../services/notification.service';

interface Query {
  city: string;
  zipCode: string;
  date?: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cities: City[];
  searchForm: FormGroup;
  min = moment();

  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              private geoService: GeoService,
              private router: Router) {
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
      const date = formData.date;
      const query: Query = {city, zipCode};
      if (date) {
        query.date = date.locale('fr').format(DATE_FORMAT);
      }
      this.router.navigate(['salles', query]);
    }
  }

  displayCity(city: City) {
    return city.nom;
  }

  aroundMe() {
    this.geoService.getPosition().subscribe(coords =>
      this.router.navigate(['salles', coords])
        .then(_ => location.reload())
    );
  }
}
