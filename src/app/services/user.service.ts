import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {BooleanResponse} from '../models/boolean-response';
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
  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.url}`, user);
  }
  emailExists(email: string): Observable<BooleanResponse> {
    return this.http.get<BooleanResponse>(`${this.url}/exists?email=${email}`);
  }
}
