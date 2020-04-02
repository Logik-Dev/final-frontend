import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {CustomValidatorsService} from '../services/custom-validators.service';
import {Room} from '../models/room';
import {BookingService} from '../services/booking.service';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';


const ftr = 'DD/MM/YYYY';

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
              private bookingService: BookingService,
              private notification: NotificationService,
              private router: Router) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
    this.form = this.fb.group({
      startDate: [this.startDate, [Validators.required, this.validator.dayAvailable(this.room.availableDays)]],
      endDate: [this.endDate, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      weekly: false,
      weekRepetition: 0
    }, {
      asyncValidators: [this.validator.dateAvailable(this.room.id)]
    });
  }

  onSubmit(data) {
    if (!this.form.invalid) {
      const begin = `${data.startDate.format(ftr)} ${data.startTime}`;
      let end = data.weekly ? data.endDate.format(ftr) : data.startDate.format(ftr);
      end += ` ${data.endTime}`;
      this.bookingService.newBooking({begin, end, weekRepetition: data.weekRepetition}, this.room.id).subscribe(
        result => {
          this.notification.showSuccess('Demande enregistrée, vous serez notifié lors de la validation');
          this.router.navigateByUrl('/profil');
        }
      );
    }
  }
  onClick(event) {
    console.log(event);
  }

}
