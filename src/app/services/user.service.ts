import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {BooleanResponse} from '../models/boolean-response';
import {ResourceService} from './resource.service';
import {UserSerializer} from '../utils/user-serializer';
@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
  constructor(http: HttpClient) {
    super(http, 'users', new UserSerializer());
  }
}
