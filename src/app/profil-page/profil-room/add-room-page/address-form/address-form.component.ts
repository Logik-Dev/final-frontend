import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiAddress, GeoService} from '../../../../services/geo.service';
import {City} from '../../../../models/city';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {addressInvalid, cityInvalid} from '../../../../utils/validators';

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
              private geoService: GeoService) {
    this.form = this.fb.group({
      label: [{value: '', disabled: true}, [Validators.required, addressInvalid]],
      city: ['', [Validators.required, cityInvalid]],
      zipCode: ['', Validators.required],
      longitude: '',
      latitude: ''
    });
  }

  ngOnInit(): void {
    this.cities$ = this.form.get('city').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.geoService.findCityByName(value))
    );
    this.addresses$ = this.form.get('label').valueChanges.pipe(
      switchMap(value => {
        if (value) {
          return this.geoService.findAddress(value, this.form.get('zipCode').value);
        } else {
          return of([]);
        }
      })
    );
  }
  displayCity(city: City) {
    return city && city.nom;
  }
  displayAddress(address: ApiAddress) {
    return address && address.properties.name;
  }
  onCitySelected() {
    const city = this.form.get('city');
    if (city.valid) {
      this.form.get('zipCode').setValue(city.value.codesPostaux[0]);
      this.form.get('label').enable();
    }
  }
  onAddressSelected() {
    const label = this.form.get('label');
    if (label.valid) {
      this.form.get('latitude').setValue(label.value.geometry.coordinates[0]);
      this.form.get('longitude').setValue(label.value.geometry.coordinates[1]);
    }
  }

  get f() {
    return this.form.controls;
  }
}
