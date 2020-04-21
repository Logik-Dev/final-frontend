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
    return moment(date.format('DD/MM/YYYY') + ' ' + time, 'DD/MM/YYYY HH:mm').locale('fr');
  }
  calculatePrice(form, price): number {
    const startDateTime = this.concatDateTime(form.startDate, form.startTime);
    const endDateTime = this.concatDateTime(form.startDate, form.endTime);
    const hours = this.getDuration(startDateTime, endDateTime);
    if (form.weekRepetition === 0) {
      return this.makeCalculation(hours, price);
    }
    const allDates = [];
    let date = form.startDate;
    while (date <= form.endDate) {
      allDates.push(date);
      const nextDate = moment(date).add(form.weekRepetition * 7 , 'days');
      if (nextDate > form.endDate) {
        break;
      } else {
        date = nextDate;
      }
    }
    return this.makeCalculation(hours * allDates.length, price);

  }
  getDuration(start, end): number {
    return moment.duration(end.diff(start)).asHours();
  }
  makeCalculation(hours, price): number {
    let total = hours * price;
    total += total / 10;
    return parseFloat(total.toFixed(1));
  }
}
