import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let newHeaders = req.headers;
    if (token && this.authService.isAuthenticated()) {
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
    }
    const authRequest = req.clone({headers: newHeaders});
    return next.handle(authRequest);
  }
}
