import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../models/booking';
import {Observable} from 'rxjs';
import {BooleanResponse} from '../models/boolean-response';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = 'http://localhost:8080/api/bookings';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  newBooking(booking, roomId: number): Observable<Booking> {
    return this.http.post<Booking>(`${this.url}/rooms/${roomId}`, booking);
  }

  isAvailable(begin, end, weekRepetition, roomId): Observable<BooleanResponse> {
    return this.http.get<BooleanResponse>
    (`${this.url}/rooms/${roomId}/available?begin=${begin}&end=${end}&weekRepetition=${weekRepetition}`);
  }

  findById(id: number) {
    return this.http.get<Booking>(`${this.url}/${id}`);
  }
}
