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

  newBooking(data, roomId: number) {
      this.http.post(`${this.url}/rooms/1`, data).subscribe(
        result => console.log(result)
      );
  }

}
