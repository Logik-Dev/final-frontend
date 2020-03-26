import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeoService} from '../../services/geo.service';
import {City} from '../../models/city';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  form: FormGroup;
  cities$: Observable<City[]>;
  zipCode;
  constructor(private fb: FormBuilder,
              private geoService: GeoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
        label: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required]
    });
    this.cities$ = this.form.get('city').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.geoService.findCityByName(value))
    );
  }
  displayCity(city: City) {
    if (city && this.form) {
      this.form.get('zipCode').setValue(city.codesPostaux[0]);
    }
    return city;
  }
}
