import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Booking} from '../../models/booking';
import {DATE_FORMAT} from '../../utils/dates';
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
              @Inject(MAT_DIALOG_DATA) public data: BookingData) { }

  ngOnInit(): void {
    const slots = this.data.booking.slots;
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `Réservation du ${slots[0].start.format(DATE_FORMAT)}` +
                  ` au ${slots[slots.length - 1].end.format(DATE_FORMAT)}`,
                amount: {
                  currency_code: 'EUR',
                  value: this.data.booking.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          this.makeRequest();
          const order = await actions.order.capture();
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  makeRequest() {
    this.bookingService.create(this.data.booking).subscribe(
      result => {
        this.notification.showSuccess('Réservation effectuée, merci de nous faire confiance');
        this.router.navigateByUrl(`/salles`);

      }
    );
  }
}
