import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {ErrorService} from './services/error.service';
import {NotificationService} from './services/notification.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const errorService = this.injector.get(ErrorService);
    const notificationService = this.injector.get(NotificationService);

    let message;
    // let stackTrace;


    if (error instanceof HttpErrorResponse) {
      // Erreur serveur
      message = errorService.getServerMessage(error);
      // TODO implémenter logging
      // stackTrace = errorService.getServerStack(error);
      notificationService.showError(message);

    } else {
      // Erreur client
      message = errorService.getClientMessage(error);
      notificationService.showError(message);
    }

    console.log(error);
  }

}
