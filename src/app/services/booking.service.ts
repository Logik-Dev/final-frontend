import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from '../models/booking';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = 'http://localhost:8080/api/bookings';
  constructor(private http: HttpClient) { }

  newBooking(data, roomId: number): Observable<Booking> {
      return this.http.post<Booking>(`${this.url}/rooms/${roomId}`, data);
  }

}
