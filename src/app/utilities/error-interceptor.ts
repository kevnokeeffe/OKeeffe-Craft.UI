import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LayoutService } from '../layout/layout.service';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const layoutService = inject(LayoutService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle the error here
      if (
        error.status === 401 ||
        error.status === 400 ||
        error.status === 403 ||
        error.status === 404 ||
        error.status === 500
      ) {
        layoutService.showErrorMessage('Error: ' + error.error);
      }
      return throwError(() => error.message);
    })
  );
}
