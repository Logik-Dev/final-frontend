import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/city';
import {map} from 'rxjs/operators';
import {Coordinates} from '../models/coordinates';
import {NotificationService} from './notification.service';

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
  urlAddress = `https://api-adresse.data.gouv.fr/search/?q=`;

  constructor(private http: HttpClient, private notification: NotificationService) {
  }

  findCityByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.urlCity}/communes?nom=${name}&fields=nom,codeDepartement,codesPostaux`);
  }

  findAddress(name?: string, zipCode?: number): Observable<ApiAddress[]> {
    return this.http.get<AddressResponse>(`${this.urlAddress}${name}&postcode=${zipCode}&limit=10`)
      .pipe(
        map(response => response.features));
  }

  getPosition(): Observable<Coordinates> {
    const observable = new Observable<Coordinates>(subscriber => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position =>
          subscriber.next({lat: position.coords.latitude, lon: position.coords.longitude})
        );
      } else {
        subscriber.error('Navigateur non supporté');
      }
    });
    return observable;
  }
}
