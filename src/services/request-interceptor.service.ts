import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {NotificationService} from './notification.service';
import {delay, finalize} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {
  private URL = environment.API_URL;

  constructor(private us: UserService,
              private notification: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.us.token;
    if (this.shouldNotShowLoader(req)) {
      return next.handle(req);
    }
    this.notification.isLoading.next(true);
    let newHeaders = req.headers;

    if (token && this.us.isLoggedIn.value) {
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
    }
    const authRequest = req.clone({headers: newHeaders});

    return next.handle(authRequest)
      .pipe(
        delay(600),
        finalize(() => this.notification.isLoading.next(false)));
  }

  shouldNotShowLoader(req: HttpRequest<any>): boolean {
    return req.url.startsWith(`${this.URL}/types`)
      || req.url.startsWith(`${this.URL}/events`)
      || req.url.startsWith(`${this.URL}/equipments`)
      || req.url.startsWith(`${this.URL}/users?email=`)
      || req.url.startsWith('https://api-adresse.data.gouv.fr/')
      || req.url.startsWith('https://geo.api.gouv.fr/');
  }
}
