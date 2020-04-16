import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../services/booking.service';
import {Room} from '../models/room';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
  @Input() room: Room;
  @Input() booking;
  constructor(private bookingService: BookingService,
              private router: Router,
              private notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Réservation',
                amount: {
                  currency_code: 'EUR',
                  value: 15
                }
              }
            ]
          });
        },
        onApprove: async (date, actions) => {
          this.makeRequest();
          const order = await actions.order.capture();
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  makeRequest() {
    this.bookingService.newBooking(this.booking, this.room.id).subscribe(
      result => {
        this.notification.showSuccess('Demande enregistrée, vous serez notifié lors de la validation');
        this.router.navigateByUrl('/profil');
      }
    );
  }
}
