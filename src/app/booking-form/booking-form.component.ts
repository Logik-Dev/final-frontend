import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {CustomValidatorsService} from '../services/custom-validators.service';
import {Room} from '../models/room';
import {BookingService} from '../services/booking.service';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';
import {DateService} from '../services/date.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentComponent} from '../payment/payment.component';


const ftr = 'DD/MM/YYYY';

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
              private validator: CustomValidatorsService,
              private dateService: DateService,
              public dialog: MatDialog) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
    this.form = this.fb.group({
      startDate: ['', [Validators.required, this.validator.dayAvailable(this.room.availableDays)]],
      endDate: [this.endDate, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      weekly: false,
      weekRepetition: 0
    }, {
      asyncValidators: [this.validator.dateAvailable(this.room.id)]
    });
    this.form.valueChanges.subscribe(value => {
      if (!this.form.invalid) {
        this.price = this.dateService.calculatePrice(value, this.room.price);
      }
    });
  }

  onSubmit() {
    if (!this.form.invalid) {

    }
  }
  generateRequestObject() {
    const data = this.form.value;
    const begin = `${data.startDate.format(ftr)} ${data.startTime}`;
    let end = data.weekly ? data.endDate.format(ftr) : data.startDate.format(ftr);
    end += ` ${data.endTime}`;
    return {begin, end, weekRepetition: data.weekRepetition};
  }
  openDialog() {
    this.dialog.open(PaymentComponent, {
      height: '300px',
      width: '400px',
      panelClass: 'paypal-dialog',
      data: {
        request: this.generateRequestObject()
      }
    });
  }
}
