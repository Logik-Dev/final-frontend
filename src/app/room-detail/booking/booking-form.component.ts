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
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {TimeSlot} from '../../../models/time-slot';

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
  duration = 0;
  invalid = true;
  @Input() room: Room;
  @Output() closeDialog = new EventEmitter();
  weekRepetition = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private fb: FormBuilder,
              private adapter: DateAdapter<any>,
              public us: UserService,
              public dialog: MatDialog,
              private bs: BookingService) {
    this.adapter.setLocale('fr');
  }

  ngOnInit(): void {
    this.createForm();
    // désactiver le formulaire si non authentifié
    !this.us.isLoggedIn.value && this.form.disable();

  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

  /**
   * Créer le formulaire
   */
  createForm(): void {
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

  /**
   * Activer les listeners
   */
  changeListeners(): void {
    this.formChangeListener();
    this.weeklyListener();
  }

  /**
   * Générer la réservation ainsi que la durée lors d'une saisie dans le formulaire
   */
  formChangeListener() {
    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(_ => {
      this.invalid = this.form.invalid;
      this.duration = 0;
      if (this.form.valid && this.form.enabled) {
        this.duration = this.bs.getTotalHours(this.booking);
      }
    });
  }

  /**
   * Reinitialiser les champs quand la récurrence est décochée
   */
  weeklyListener() {
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

  /**
   * N'afficher que les jours disponibles dans le calendrier
   */
  filterDays() {
    return (date: moment.Moment): boolean => {
      return this.room.availableDays.includes(date.locale('fr').format('dddd'));
    };
  }

  /**
   * Créer l'objet Booking
   */
  createBooking(slots: TimeSlot[]): Booking {
    const price = totalPrice(this.room.price, this.duration);
    return  {slots, client: {id: this.us.userId}, price: parseFloat(price), room: {id: this.room.id}};
  }

  /**
   * Générer les TimeSlot
   */
  generateSlots(): TimeSlot[] {
    const data = this.form.value;
    const start = data.startDate;
    let end = start;
    if (data.weekRepetition > 0 && moment(data.endDate).isAfter(start)) {
      end = data.endDate;
    }
    const begin = moment(data.startTime, TIME_FORMAT);
    const finish = moment(data.endTime, TIME_FORMAT);
    const weekly = data.weekRepetition;
    return BookingService.getSlots(start, end, begin, finish, weekly);
  }

  /**
   * Ouvrir la dialog paypal si le formulaire est valide
   */
  openDialog(): void {
    if (this.form.valid) {
      this.dialog.open(PaymentComponent, {
        height: '300px',
        width: '400px',
        panelClass: 'paypal-dialog',
        data: {
          booking: this.booking
        }
      });
    }
  }

  /**
   * Accesseurs
   */
  get booking(): Booking {
    return this.createBooking(this.generateSlots());
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
