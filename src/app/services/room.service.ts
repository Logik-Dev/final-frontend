import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {Observable} from 'rxjs';
import {RoomType} from '../models/room-type';
import {Equipment} from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = `http://localhost:8080/api/rooms`;
  constructor(private http: HttpClient) {}

  findById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`);
  }

  findRooms(city?: string, date?: string ): Observable<Room[]> {
    if (city) {
      this.url += `?city=${city}`;
    }
    if (date) {
      this.url += `&date=${date}`;
    }
    return this.http.get<Room[]>(this.url);
  }

  addRoom(room: Room, photos: File[]) {
    const formData = new FormData();
    photos.forEach(photo => {
      formData.append('files', photo, photo.name);
    });
    this.http.post<Room>(this.url, room).subscribe(
      roomResult => this.http.post(`${this.url}/${roomResult.id}/photos`, formData).subscribe(
        result => console.log(result)
      )
    );
  }
  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.url}/equipments`);
  }
  getTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${this.url}/types`);
  }
}
