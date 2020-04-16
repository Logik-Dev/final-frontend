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
  concatDateTime(date, time) {
    return moment(date.format('DD/MM/YYYY') + ' ' + time, 'DD/MM/YYYY HH:mm');
  }
  calculatePrice(form, price) {
    const result = [];
    const startDateTime = this.concatDateTime(form.startDate, form.startTime);
    if (form.weekRepetition === 0) {
      const endDateTime = this.concatDateTime(form.startDate, form.endTime);
      const hours = moment.duration(endDateTime.diff(startDateTime)).asHours();
      return this.makeCalculation(hours, price);
      return;
    }

    let date = form.startDate;
    while (form.endDate > date) {
      result.push(date);
      date = moment(date).add(form.weekRepetition * 7 , 'days');
    }
    console.log(result);
  }

  makeCalculation(hours, price) {
    let total = hours * price;
    total += total / 10;
    return total;
  }
}
