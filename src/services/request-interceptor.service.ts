import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private us: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.us.token;
    if (req.url.startsWith('https://api-adresse.data.gouv.fr/')) {
      return next.handle(req);
    }
    let newHeaders = req.headers;

    if (token && this.us.isLoggedIn.value) {
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
    }
    const authRequest = req.clone({headers: newHeaders});
    return next.handle(authRequest);
  }
}
