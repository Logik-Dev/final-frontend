import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {City} from '../models/city';
import { map} from 'rxjs/operators';

export interface ApiAddress {
  geometry: {
    coordinates: number[]
  };
  properties: {
    label: string;
    name: string;
    city: string;
  };
}
export interface AddressResponse {
  features: ApiAddress[];
}

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  urlCity = `https://geo.api.gouv.fr`;
  urlAddress = `https://api-adresse.data.gouv.fr/search/?q=`
  constructor(private http: HttpClient) { }

  findCityByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.urlCity}/communes?nom=${name}&fields=nom,codeDepartement,codesPostaux`);
  }
  findAddress(name?: string, zipCode?: number): Observable<ApiAddress[]> {
    return this.http.get<AddressResponse>(`${this.urlAddress}${name}&postcode=${zipCode}&limit=10`)
      .pipe(
        map(response => response.features));

  }
}
