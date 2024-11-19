import { Injectable, OnDestroy } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './store/authentication.service';
import { Store } from '@ngrx/store';
import {
  getIsAuthenticated,
  getWeatherForecastSuccess,
} from './store/authentication.selectors';
import { Subscription, take } from 'rxjs';
import { Utils } from '../utilities/utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements OnDestroy {
  isAuthenticatedSubscription: Subscription | undefined;
  isApiConnectedSubscription: Subscription | undefined;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private store: Store<any>
  ) {}

  ngOnDestroy(): void {
    if (this.isAuthenticatedSubscription) {
      Utils.Unsubscribe(this.isAuthenticatedSubscription);
    }
    if (this.isApiConnectedSubscription) {
      Utils.Unsubscribe(this.isApiConnectedSubscription);
    }
  }

  canActivate(state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    let isAuthenticated: boolean | undefined;
    let isApiConnected: boolean | undefined;
    this.store
      .select(getIsAuthenticated)
      .pipe(take(1))
      .subscribe((value) => (isAuthenticated = value));
    this.store
      .select(getWeatherForecastSuccess)
      .pipe(take(1))
      .subscribe((value) => (isApiConnected = value));

    if (user && isAuthenticated && isApiConnected) {
      // check if route is restricted by role
      // if (route.data['roles'] && !route.data['roles'].includes(user.role)) {
      //   // role not authorized so redirect to home page
      //   this.router.navigate(['/']);
      //   return false;
      // }

      // authorized so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/']);
      return false;
    }
  }
}
