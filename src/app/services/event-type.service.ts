import { Injectable } from '@angular/core';
import {ResourceService} from './resource.service';
import {EventType} from '../models/event-type';
import {HttpClient} from '@angular/common/http';

import {NoOpSerializer} from '../utils/no-op-serializer';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService extends ResourceService<EventType> {

  constructor(http: HttpClient) {
    super(http, 'rooms/events', new NoOpSerializer<EventType>());
  }
}
