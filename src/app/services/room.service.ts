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

}
