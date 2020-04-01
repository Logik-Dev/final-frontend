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
    if (days.length) {
      days.sort((a, b) => this.getIsoDay(a) - this.getIsoDay(b));
      return days.map(day => this.toFrenchDay(day));
    }
  }
  getIsoDay(day: string) {
    return moment().day(day).isoWeekday();
  }
  formatDate(date) {
    return moment.utc(date).local(true).locale('fr').format('LL');
  }
}
