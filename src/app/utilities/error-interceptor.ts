import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/store/authentication.service';
import { LayoutService } from '../layout/layout.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private layoutService: LayoutService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('ErrorInterceptor');
    return next.handle(req).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status) && this.authService.userValue) {
          // auto logout if 401 or 403 response returned from api
          this.authService.logout();
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        this.layoutService.showErrorMessage(err.error.message);
        return throwError(() => error);
      })
    );
  }
}
export const errorInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
