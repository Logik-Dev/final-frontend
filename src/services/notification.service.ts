import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public isLoading = new BehaviorSubject(false);
  constructor(private snackBar: MatSnackBar,
              private zone: NgZone) { }

  openSnackBar(message: string, classes: string[]) {
    this.zone.run(() =>
      this.snackBar.open(message, 'X', {
        panelClass: classes,
        duration: 6000,
      })
    );
  }

  showSuccess(message: string) {
    this.openSnackBar(message, ['success-dialog']);
  }
  showError(message: string) {
    this.openSnackBar(message, ['error-dialog']);
  }
}
