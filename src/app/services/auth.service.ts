import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../models/token-response';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {UserService} from './user.service';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `http://localhost:8080/api/users/login`;
  public currentUser: BehaviorSubject<User>;
  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) {
    this.currentUser = new BehaviorSubject<User>(this.getCurrentUser());
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<TokenResponse>(this.url, {email, password})
      .pipe(
        tap(response => sessionStorage.setItem('jwt', response.jwt)),
        switchMap(_ => this.userService.findById(this.getUserId())
          .pipe(tap(user => {
            this.currentUser.next(user);
            sessionStorage.setItem('user', JSON.stringify(user));
          })))
      );
  }
  logout() {
    sessionStorage.removeItem('jwt');
    this.router.navigate(['/connexion']);
  }

  getToken(): string {
    return sessionStorage.getItem('jwt');
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const expiration = jwt_decode(token).exp;
    const now = new Date().getTime() / 1000;
    if (now > expiration) {
      return false;
    }
    return true;
  }
  getUserId() {
    return jwt_decode(this.getToken()).id;
  }
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
