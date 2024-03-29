import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getBaseEndpoint } from '../configuration/store/configuration.selectors';
import { AuthenticationService } from '../authentication/store/authentication.service';

/**
 * Extends HTTP Interceptor and modifies request to add API credentials
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private base: any;

  constructor(
    private store: Store<any>,
    private authenticationService: AuthenticationService
  ) {
    this.store.select(getBaseEndpoint).subscribe((base) => (this.base = base));
  }

  /**
   * Intercept HTTP requests to set API credentials and handle error responses
   * @param request - the unmodified outgoing request
   * @param next - the response event stream to transform
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only set authentication header if request is being sent to api
    const user = this.authenticationService.userValue;
    const isLoggedIn = user.jwtToken;
    if (isLoggedIn && request.url.startsWith(this.base)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // here we can modify the response
          }
        },
        error: (errorResponse: any) => {
          if (errorResponse instanceof HttpErrorResponse) {
            // here we can handle errors
            if (errorResponse.status === 401) {
            }
          }
        },
      })
    );
  }
}
