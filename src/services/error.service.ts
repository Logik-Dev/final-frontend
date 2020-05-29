import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'Pas de connexion internet';
    }
    return error.toString();
  }
  getServerMessage(error: HttpErrorResponse): string {
    return error.error.message;
  }

}
