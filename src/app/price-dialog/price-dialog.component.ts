import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {environment} from '../../environments/environment';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss']
})
export class PriceDialogComponent implements OnInit {
  price = new FormControl(0);
  constructor(public matDialogRef: MatDialogRef<PriceDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.price.value) {
      this.matDialogRef.close(this.price.value);
    }
  }

  get commission() {
    return (this.price.value / 100 * this.COMMISSION).toFixed(2);
  }

  get tva() {
    return ((this.price.value + parseFloat(this.commission)) / 100 * this.TVA).toFixed(2);
  }

  get total() {
    return (this.price.value + parseFloat(this.commission) + parseFloat(this.tva)).toFixed(2);
  }

  get TVA() {
    return environment.TVA;
  }

  get COMMISSION() {
    return environment.COMMISSION;
  }

}
