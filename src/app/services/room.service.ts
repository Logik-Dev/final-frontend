import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {ResourceService} from './resource.service';
import {RoomSerializer} from '../utils/room-serializer';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends ResourceService<Room> {
  url = environment.API_URL;
  constructor(http: HttpClient) {
    super(http, 'rooms', new RoomSerializer(), 'users');
  }
  /**
  findById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`);
  }

  findRooms(city?: string, zipCode?: number, date?: string ): Observable<Room[]> {
    let url = city ? `${this.url}?city=${city}&zipCode=${zipCode}` : this.url;
    url = date ? `${url}&day=${date}` : url;
    return this.http.get<Room[]>(url);
  }
  findByUser(id: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.url}/users/${id}`);
  }
  addRoom(room: Room, photos: File[]): Observable<Room> {
    const formData = new FormData();
    photos.forEach(photo => {
      formData.append('files', photo, photo.name);
    });
    return this.http.post<Room>(this.url, room).pipe(
      mergeMap(roomResult => this.http.post<Room>(`${this.url}/${roomResult.id}/photos`, formData))
    );
  }
  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.url}/equipments`);
  }
  getTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${this.url}/types`);
  }
   */
}
