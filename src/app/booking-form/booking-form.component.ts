import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {CustomValidatorsService} from '../services/custom-validators.service';
import {Room} from '../models/room';
import {VariableAst} from '@angular/compiler';
import {BookingService} from '../services/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  @Input() room: Room;
  form: FormGroup;
  startDate = moment();
  endDate = moment().add(1, 'week');
  weekRepetition = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              private validator: CustomValidatorsService,
              private bookingService: BookingService) { }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
    this.form = this.fb.group({
      startDate: [this.startDate, Validators.required ],
      endDate: [this.endDate, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      weekly: false,
      weekRepetition: 0
    }, {
      validator: this.validator.dayAvailable('startDate', this.room.availableDays)
    });
  }
  get f() { return this.form.controls; }

  onSubmit(data) {
    if (!this.form.invalid) {
      const begin = data.startDate.format('DD/MM/YYYY') + ' ' + data.startTime;
      let end;
      if (data.weekly) {
        end = data.endDate.format('DD/MM/YYYY') + ' ' + data.endTime;
      } else {
        end = data.startDate.format('DD/MM/YYYY') + ' ' + data.endTime;
      }
      const booking = {begin, end, weekRepetition: data.weekRepetition};
      console.log(booking);
      this.bookingService.newBooking(booking, this.room.id);
    }
  }
}
