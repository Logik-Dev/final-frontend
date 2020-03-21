import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  url = `https://geo.api.gouv.fr`;
  constructor(private http: HttpClient) { }

  findCityByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.url}/communes?nom=${name}&fields=nom,codeDepartement,codesPostaux`);
  }

}
