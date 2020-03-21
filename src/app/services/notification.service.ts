import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar,
              private zone: NgZone) { }

  openSnackBar(message: string, classes: string[]) {
    this.zone.run(() =>
      this.snackBar.open(message, 'X', {
        panelClass: classes,
        duration: 3000,
        verticalPosition: 'bottom'})
    );
  }

  showSuccess(message: string) {
    this.openSnackBar(message, ['success-dialog']);
  }
  showError(message: string) {
    this.openSnackBar(message, ['error-dialog']);
  }
}
