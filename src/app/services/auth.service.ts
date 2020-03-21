import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../models/token-response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `http://localhost:8080/api/users/login`;
  constructor(private http: HttpClient,
              private router: Router) { }

  login(email: string, password: string) {
    this.http.post<TokenResponse>(`${this.url}`, {email, password})
      .subscribe(response => {
        sessionStorage.setItem('jwt', response.jwt);
        this.router.navigate(['/profil']);
      });
  }
  getToken(): string {
    return sessionStorage.getItem('jwt');
  }
}
