import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {Room} from '../models/room';
import {MatDialog} from '@angular/material/dialog';
import {PaymentComponent} from '../payment/payment.component';
import {dateAvailable, datePassed, dayAvailable, hoursValid} from '../utils/validators';
import {Booking} from '../models/booking';
import {TIME_FORMAT} from '../utils/dates';
import {AuthService} from '../services/auth.service';
import {BookingService} from '../services/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  @Input() room: Room;
  form: FormGroup;
  endDate = moment().add(1, 'week');
  weekRepetition = [1, 2, 3, 4, 5, 6, 7, 8];
  price = 0;
  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              private auth: AuthService,
              public dialog: MatDialog,
              private bookingService: BookingService) {
  }



  ngOnInit(): void {
    this.adapter.setLocale('fr');
    this.form = this.fb.group({
      startDate: ['', [Validators.required, dayAvailable(this.room.availableDays), datePassed]],
      endDate: [this.endDate, [Validators.required, datePassed]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      weekly: false,
      weekRepetition: 0
    }, {
      validators: [hoursValid(), dateAvailable(this.room)]
    });
    this.form.valueChanges.subscribe(value => {
      if (!this.form.invalid) {
        this.price = this.bookingService.getPrice(this.createBooking(), this.room.price);
      }
    });
    this.form.get('startDate').valueChanges.subscribe(
      value => this.form.get('endDate').setValue(moment(value).add(7, 'days'))
    );
  }

  onSubmit() {
    if (!this.form.invalid) {
        this.openDialog();
    }
  }
  createBooking(): Booking {
    const data = this.form.value;
    const start = data.startDate;
    const end = data.weekly > 0 ? data.endDate : start;
    const begin = moment(data.startTime, TIME_FORMAT);
    const finish = moment(data.endTime, TIME_FORMAT);
    const weekly = data.weekRepetition;
    const slots = BookingService.getSlots(start, end, begin, finish, weekly);
    return {slots, client: {id: this.auth.getUserId()}, price: this.price, room: {id: this.room.id}};
  }
  openDialog() {
    this.dialog.open(PaymentComponent, {
      height: '300px',
      width: '400px',
      panelClass: 'paypal-dialog',
      data: {
        booking: this.createBooking()
      }
    });
  }
  get f() {
    return this.form.controls;
  }
}
