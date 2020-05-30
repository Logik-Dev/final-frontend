import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiAddress, GeoService} from '../../../services/geo.service';
import {City} from '../../../models/city';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {addressInvalid, cityInvalid} from '../../../utils/validators';

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
  }

  ngOnInit(): void {
    this.createForm();
    this.autocompleteCities();
    this.autocompleteAddress();
  }

  /**
   * Création du formulaire
   */
  createForm(): void {
    this.form = this.fb.group({
      label: [{value: '', disabled: true}, [Validators.required, addressInvalid]],
      city: ['', [Validators.required, cityInvalid]],
      zipCode: ['', Validators.required],
      longitude: '',
      latitude: ''
    });
  }

  /**
   * Autocomplétion des villes
   */
  autocompleteCities(): void {
    this.cities$ = this.form.get('city').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.geoService.findCityByName(value))
    );
  }

  /**
   * Autocomplétion des adresses
   */
  autocompleteAddress(): void {
    this.addresses$ = this.form.get('label').valueChanges.pipe(
      switchMap(value => value ?
        this.geoService.findAddress(value, this.form.get('zipCode').value) :
        of([])
      )
    );
  }

  /**
   * Afficher le nom de la ville dans le select
   * @param city l'objet City à traiter
   */
  displayCity(city: City): string {
    return city && city.nom;
  }

  /**
   * Afficher une adresse dans le select
   * @param address l'objet ApiAddress à traité
   */
  displayAddress(address: ApiAddress): string {
    return address && address.properties.name;
  }

  /**
   * Insérer le code postal dans le formulaire quand
   * une ville est sélèctionnée et activer la saisie d'adresse
   */
  onCitySelected() {
    const city = this.form.get('city');
    if (city.valid) {
      this.form.get('zipCode').setValue(city.value.codesPostaux[0]);
      this.form.get('label').enable();
    }
  }

  /**
   * Insérer les coordonnées dans le formulaire
   * quand une adresse est sélectionnée
   */
  onAddressSelected() {
    const label = this.form.get('label');
    if (label.valid) {
      this.form.get('latitude').setValue(label.value.geometry.coordinates[1]);
      this.form.get('longitude').setValue(label.value.geometry.coordinates[0]);
    }
  }
}
