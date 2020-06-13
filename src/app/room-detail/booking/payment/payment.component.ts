import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BookingService} from '../../../../services/booking.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../../services/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Booking} from '../../../../models/booking';
import {DATE_FORMAT} from '../../../../utils/dates';
import {UserService} from '../../../../services/user.service';
import {delay} from 'rxjs/operators';

declare var paypal;

interface BookingData {
  booking: Booking;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  constructor(private bookingService: BookingService,
              private router: Router,
              private notification: NotificationService,
              private us: UserService,
              @Inject(MAT_DIALOG_DATA) public data: BookingData) {
  }

  ngOnInit(): void {
    this.generatePaypalButtons();
  }

  /**
   * Créer les boutons Paypal
   */
  generatePaypalButtons() {
    paypal.Buttons({createOrder: this.createOrder(), onApprove: this.onApprove()})
      .render(this.paypalElement.nativeElement);
  }

  /**
   * Initialiser le paiment par paypal
   */
  createOrder() {
    return (data, actions) => {
      const slots = this.data.booking.slots;
      const price = this.data.booking.price;
      return actions.order.create({
        purchase_units: [{
          description: `Réservation du ${slots[0].start.format(DATE_FORMAT)}` +
            ` au ${slots[slots.length - 1].end.format(DATE_FORMAT)}`,
          amount: {currency_code: 'EUR', value: price}
        }]
      });
    };
  }

  /**
   * Paiment autorisé par le client
   */
  onApprove() {

    return async (data, actions) => {
      const order = await actions.order.capture();
      console.log(order);
      this.saveBooking();
    };
  }

  /**
   * Effectuer la requête d'enregistrement de la résevation
   */
  saveBooking() {
    this.bookingService.create(this.data.booking)
      .subscribe(_ => {
        this.notification.showSuccess('Réservation effectuée, merci de nous faire confiance');
        this.us.refreshUser().subscribe(() =>
          this.router.navigateByUrl(`/profil/réservations`).finally()
        );
      }
    );
  }
}
