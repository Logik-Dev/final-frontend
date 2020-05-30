import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookingService} from '../../../../services/booking.service';
import {COM, TVA} from '../../../../utils/price-utils';

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss']
})
export class PriceDialogComponent implements OnInit {
  readonly TVA = TVA;
  readonly COM = COM;
  price = new FormControl('');
  constructor(public matDialogRef: MatDialogRef<PriceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.data.price && this.price.setValue(this.data.price);
  }

  onSubmit() {
    if (this.price.value) {
      this.matDialogRef.close(this.price.value);
    }
  }


}
