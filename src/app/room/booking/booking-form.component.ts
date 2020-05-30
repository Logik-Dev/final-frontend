import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {Room} from '../../../models/room';
import {MatDialog} from '@angular/material/dialog';
import {PaymentComponent} from './payment/payment.component';
import {dateAvailable, hoursValid} from '../../../utils/validators';
import {Booking} from '../../../models/booking';
import {TIME_FORMAT} from '../../../utils/dates';
import {BookingService} from '../../../services/booking.service';
import {UserService} from '../../../services/user.service';
import {COM, totalPrice, TVA} from '../../../utils/price-utils';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent implements OnInit, OnDestroy {
  readonly TVA = TVA;
  readonly COM = COM;
  form: FormGroup;
  weekRepetition = [1, 2, 3, 4, 5, 6, 7, 8];
  duration = 0;
  invalid = true;
  @Input() room: Room;
  @Output() closeDialog = new EventEmitter();
  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              public us: UserService,
              public dialog: MatDialog,
              private bs: BookingService) {
    this.adapter.setLocale('fr');
  }

  ngOnInit(): void {
    this.createForm();
    !this.us.isLoggedIn.value && this.form.disable();

  }
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
  createForm() {
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
    this.changeListeners();
  }
  changeListeners() {
    this.formChangeListener();
    this.fieldsChangeListener();
  }
  formChangeListener() {
    this.form.valueChanges.subscribe(_ => {
      this.invalid = this.form.invalid;
      this.duration = 0;
      if (!this.form.invalid && this.form.enabled) {
        const booking = this.createBooking();
        this.duration = this.bs.getTotalHours(booking);
      }
    });
  }
  fieldsChangeListener() {
    this.form.get('weekly').valueChanges
      .subscribe(value => {
          if (value === false) {
            this.form.get('weekRepetition').setValue(0);
            this.form.get('endDate').setErrors(null);
            this.form.updateValueAndValidity();
          }
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

    const price = totalPrice(this.room.price, this.duration);
    return {slots, client: {id: this.us.userId}, price: parseFloat(price) , room: {id: this.room.id}};
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
