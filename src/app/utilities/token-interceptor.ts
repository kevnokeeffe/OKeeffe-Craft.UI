import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../authentication/store/authentication.service';
import { Store } from '@ngrx/store';
import { getBaseEndpoint } from '../configuration/store/configuration.selectors';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const store = inject(Store);
  let base;
  store
    .select(getBaseEndpoint)
    .pipe()
    .subscribe((baseEndpoint) => {
      base = baseEndpoint;
    });
  const token = authenticationService?.userValue?.jwtToken;
  if (base && token && req.url.startsWith(base)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
