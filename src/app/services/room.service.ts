import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = `http://localhost:8080/api/rooms`;
  constructor(private http: HttpClient) {}

  findRooms(city?: string, date?: string ): Observable<Room[]> {
    if (city) {
      this.url += `?city=${city}`;
    }
    if (date) {
      this.url += `&date=${date}`;
    }
    return this.http.get<Room[]>(this.url);
  }
}
