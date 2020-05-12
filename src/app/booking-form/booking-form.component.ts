import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
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
})
export class BookingFormComponent implements OnInit, OnDestroy {
  @Input() room: Room;
  @Output() closeDialog = new EventEmitter();
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
    this.createForm();
    !this.auth.isAuthenticated() && this.form.disable();

  }
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
  createForm() {
    this.form = this.fb.group({
      startDate: [{value: '', disabled: true, validators: Validators.required}],
      endDate: [{value: '', disabled: true}],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      weekly: '',
      weekRepetition: 0
    }, {
      validators: [hoursValid(), dateAvailable(this.room)]
    });
    this.changeListeners();
  }
  changeListeners() {
    this.formChangeListener();
    this.fieldsChangeListener();
  }
  formChangeListener() {
    this.form.valueChanges.subscribe(_ => {
      if (!this.form.invalid && this.form.enabled) {
        const booking = this.createBooking();
        this.price = this.bookingService.getPrice(booking, this.room.price);
      }
    });
  }
  fieldsChangeListener() {
    this.form.get('weekly').valueChanges
      .subscribe(value => {
          !value && this.form.get('weekRepetition').setValue(0);
          value && this.form.get('endDate').setValidators([Validators.required]);
          this.form.updateValueAndValidity();
          console.log(this.form);
        }
      );
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
  get invalid() {
    return this.form.invalid;
  }
  get f() {
    return this.form.controls;
  }

}
