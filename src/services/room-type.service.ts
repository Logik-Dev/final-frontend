import { Injectable } from '@angular/core';
import {ResourceService} from './resource.service';
import {RoomType} from '../models/room-type';
import {HttpClient} from '@angular/common/http';
import {NoOpSerializer} from '../utils/no-op-serializer';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService extends ResourceService<RoomType> {

  constructor(http: HttpClient) {
    super(http, 'types', new NoOpSerializer<RoomType>());
  }
}
