import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { ConfigurationService } from './configuration/store/configuration.service';
import { Store } from '@ngrx/store';
import { getConfigurationLoaded } from './configuration/store/configuration.selectors';
import { AuthenticationActions } from './authentication/store/authentication.actions';
import { Utils } from './utilities/utils';
import {
  EMPTY,
  Subject,
  Subscription,
  filter,
  interval,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { getWeatherForecastSuccess } from './authentication/store/authentication.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private getConfigurationLoadedSubscription: Subscription | undefined;
  private getWeatherForecastSuccessSubscription: Subscription | undefined;
  constructor(
    private configurationService: ConfigurationService,
    private store: Store<any>
  ) {
    this.loadConfigurationActions();
  }

  private loadConfigurationActions(): void {
    this.configurationService.initialLoad();
    this.getConfigurationLoadedSubscription = this.store
      .select(getConfigurationLoaded)
      .subscribe({
        next: (loaded) => {
          if (loaded) {
            this.store.dispatch(AuthenticationActions.refreshToken());
            this.getWeatherforcast();
          }
        },
      });
  }

  private getWeatherforcast(): void {
    const tenMinutes = 600000; // 10 minutes in milliseconds

    // Create an observable that completes after 10 minutes
    const stopAfterTenMinutes$ = timer(tenMinutes);

    this.getWeatherForecastSuccessSubscription = this.store
      .select(getWeatherForecastSuccess)
      .pipe(
        switchMap((success) => {
          if (!success) {
            return interval(1000).pipe(
              tap(() =>
                this.store.dispatch(AuthenticationActions.weatherForcast())
              ),
              takeUntil(stopAfterTenMinutes$),
              takeUntil(
                this.store
                  .select(getWeatherForecastSuccess)
                  .pipe(filter((success) => success))
              )
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.getConfigurationLoadedSubscription) {
      Utils.Unsubscribe(this.getConfigurationLoadedSubscription);
    }
    if (this.getWeatherForecastSuccessSubscription) {
      Utils.Unsubscribe(this.getWeatherForecastSuccessSubscription);
    }
  }
}
