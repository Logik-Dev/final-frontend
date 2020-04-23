import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../models/token-response';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `http://localhost:8080/api/users/login`;
  constructor(private http: HttpClient,
              private router: Router,
              private location: Location) { }

  login(email: string, password: string) {
    this.http.post<TokenResponse>(this.url, {email, password})
      .subscribe(response => {
        sessionStorage.setItem('jwt', response.jwt);
        this.location.back();
      });
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

}
