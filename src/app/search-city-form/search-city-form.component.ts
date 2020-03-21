import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {GeoService} from '../services/geo.service';
import {Observable} from 'rxjs';
import {City} from '../models/city';

@Component({
  selector: 'app-search-city-form',
  templateUrl: './search-city-form.component.html',
  styleUrls: ['./search-city-form.component.scss']
})
export class SearchCityFormComponent implements OnInit {
  cities$: Observable<City[]>;
  cityForm: FormGroup;
  constructor(private fb: FormBuilder,
              private geoService: GeoService) {
    this.cityForm = fb.group({city: ''});
  }

  ngOnInit(): void {
    this.cities$ = this.cityForm.get('city').valueChanges.pipe(
      debounceTime(800),
      switchMap(value => this.geoService.findCityByName(value))
    );
  }

}
