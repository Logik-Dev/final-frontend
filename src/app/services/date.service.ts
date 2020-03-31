import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  toFrenchDay(day: string): string {
    return moment().day(day).locale('fr').format('dddd');
  }

  sortDays(days: string[]) {
    days.sort((a, b) => this.getIsoDay(a) - this.getIsoDay(b));
    return days.map(day => this.toFrenchDay(day));

  }
  getIsoDay(day: string) {
    return moment().day(day).isoWeekday();
  }
}
