import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiAddress, GeoService} from '../../services/geo.service';
import {City} from '../../models/city';
import {Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {CustomValidatorsService} from '../../services/custom-validators.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  form: FormGroup;
  cities$: Observable<City[]>;
  zipCode;
  addresses$: Observable<ApiAddress[]>;
  constructor(private fb: FormBuilder,
              private geoService: GeoService,
              private validator: CustomValidatorsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      address: [{value: '', disabled: true}, [Validators.required, this.validator.addressInvalid()]],
      city: ['', [Validators.required, this.validator.cityInvalid()]],
      zipCode: ['', Validators.required]
    });
    this.cities$ = this.form.get('city').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.geoService.findCityByName(value))
    );

    this.addresses$ = this.form.get('address').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => value && this.geoService.findAddress(value, this.form.get('zipCode').value))
    );
  }
  displayCity(city: City) {
    return city && city.nom;
  }
  displayAddress(address: ApiAddress ) {
      return address && address.properties.name;

  }
  onCitySelected() {
    const city = this.form.get('city');
    if (city.valid) {
      this.form.get('zipCode').setValue(city.value.codesPostaux[0]);
      this.form.get('address').enable();
    }
  }
  onAddressSelected() {
    const address = this.form.get('address');
  }
  get f() { return this.form.controls; }
}
