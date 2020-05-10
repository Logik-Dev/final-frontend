import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {Room} from '../models/room';
import {MatDialog} from '@angular/material/dialog';
import {PaymentComponent} from '../payment/payment.component';
import {dateAvailable, hoursValid} from '../utils/validators';
import {Booking} from '../models/booking';
import {TIME_FORMAT} from '../utils/dates';
import {AuthService} from '../services/auth.service';
import {BookingService} from '../services/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent implements OnInit {
  @Input() room: Room;
  form: FormGroup;
  weekRepetition = [1, 2, 3, 4, 5, 6, 7, 8];
  price = 0;

  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              public auth: AuthService,
              public dialog: MatDialog,
              private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
    this.form = this.fb.group({
      startDate: [{value: '', disabled: true, validators: Validators.required}],
      endDate: [{value: '', disabled: true, validators: Validators.required}],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      weekly: '',
      weekRepetition: 0
    }, {
      validators: [hoursValid(), dateAvailable(this.room)]
    });
    this.form.valueChanges.subscribe(value => {
      if (!this.form.invalid) {
        const booking = this.createBooking();
        this.price = this.bookingService.getPrice(booking, this.room.price);
      }
    });
    this.form.get('weekly').valueChanges
      .subscribe(value => !value && this.form.get('weekRepetition').setValue(0));
  }
  filterDays() {
    return (date: moment.Moment): boolean => {
      return this.room.availableDays.includes(date.locale('fr').format('dddd'));
    };
  }

  onSubmit() {
    if (!this.form.invalid) {
        this.openDialog();
    }
  }
  createBooking(): Booking {
    const data = this.form.value;
    const start = data.startDate;
    let end = start;
    if (data.weekRepetition > 0 && moment(data.endDate).isAfter(start)) {
      end = data.endDate;
    }
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

  get startMin() {
    return moment();
  }
  get startMax() {
    return moment().add(1, 'year');
  }
  get endMin() {
    return moment().add(1, 'week');
  }
  get endMax() {
    return this.startMax.add(1, 'week');
  }
  get f() {
    return this.form.controls;
  }

}
