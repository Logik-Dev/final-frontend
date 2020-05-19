import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {ResourceService} from './resource.service';
import {UserSerializer} from '../utils/user-serializer';
import {delay, switchMap, tap} from 'rxjs/operators';
import {TokenResponse} from '../models/token-response';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
  private readonly userSubject: BehaviorSubject<User>;
  private readonly isLoggedSubject: BehaviorSubject<boolean>;

  constructor(http: HttpClient, private router: Router) {
    super(http, 'users', new UserSerializer());
    this.userSubject = new BehaviorSubject<User>(this.storedUser);
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isTokenValid);
  }

  update(item: User): Observable<User> {
    return super.update(item).pipe(
      tap(user => this.storedUser = user),
    );
  }
  delete(id: number) {
    return super.delete(id).pipe(
      tap(_ => this.logout())
    );
  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<TokenResponse>(`${this.url}/${this.endpoint}/login`, {email, password})
      .pipe(
        tap(response => sessionStorage.setItem('jwt', response.jwt)),
        switchMap(_ => this.findById(this.userId)
          .pipe(tap(user => this.storedUser = user))
        ));
  }

  logout() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('user');
    this.isLoggedSubject.next(false);
    this.router.navigate(['/connexion']).finally();
  }

  get token(): string {
    return sessionStorage.getItem('jwt');
  }

  get isTokenValid(): boolean {
    if (!this.token) {
      return false;
    }
    const expiration = jwt_decode(this.token).exp;
    const now = new Date().getTime() / 1000;
    return now <= expiration;
  }

  get userId(): number {
    return jwt_decode(this.token).id;
  }

  get storedUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  set storedUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  get isLoggedIn(): BehaviorSubject<boolean> {
    this.isLoggedSubject.next(this.isTokenValid);
    return this.isLoggedSubject;
  }

  get currentUser(): BehaviorSubject<User> {
    this.userSubject.next(this.storedUser);
    return this.userSubject;
  }
}
