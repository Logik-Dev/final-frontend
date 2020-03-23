import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {User} from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `http://localhost:8080/api/users`;
  constructor(private http: HttpClient) { }
  getUserInfos(): Observable<User> {
    const token = sessionStorage.getItem('jwt');
    const id = jwt_decode(token).id;
    return this.http.get<User>(`${this.url}/${id}`);
  }
  getUsername
}
