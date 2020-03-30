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
    return error.message ? error.message : error.toString();
  }
  getClientStack(error: Error): string {
    return error.stack;
  }
  getServerMessage(error: HttpErrorResponse): string {
    console.log(error);
    return error.error.message;
  }
  getServerStack(error: HttpErrorResponse) {
    // gérer la pille
    return 'stack';
  }
}
