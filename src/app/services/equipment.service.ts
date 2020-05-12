import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NoOpSerializer} from '../utils/no-op-serializer';
import {Equipment} from '../models/equipment';
import {ResourceService} from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends ResourceService<Equipment>{

  constructor(http: HttpClient) {
    super(http, 'equipments', new NoOpSerializer<Equipment>());
  }
}
