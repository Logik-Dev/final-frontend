import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../models/booking';
import {Observable} from 'rxjs';
import {BooleanResponse} from '../models/boolean-response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = 'http://localhost:8080/api/bookings';
  constructor(private http: HttpClient) { }

  newBooking(booking, roomId: number): Observable<Booking> {
      return this.http.post<Booking>(`${this.url}/rooms/${roomId}`, booking);
  }
  isAvailable(begin, end, weekRepetition, roomId): Observable<BooleanResponse> {
    return this.http.get<BooleanResponse>(`${this.url}/rooms/${roomId}?begin=${begin}&end=${end}&weekRepetition=${weekRepetition}`);
  }
}
