import { HttpRequest, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
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
        error.status >= 400 // ||
        // error.status === 401 ||
        // error.status === 402 ||
        // error.status === 403 ||
        // error.status === 404 ||
        // error.status === 405 ||
        // error.status === 406 ||
        // error.status === 407 ||
        // error.status === 408 ||
        // error.status === 409 ||
        // error.status === 410 ||
        // error.status === 411 ||
        // error.status === 412 ||
        // error.status === 413 ||
        // error.status === 414 ||
        // error.status === 415 ||
        // error.status === 500 ||
        // error.status === 502 ||
        // error.status === 503 ||
        // error.status === 504
      ) {
        layoutService.showErrorMessage('Error: ' + error.error.message);
      }
      return throwError(() => error.message);
    })
  );
}
