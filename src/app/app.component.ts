import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { ConfigurationService } from './configuration/store/configuration.service';
import { Store } from '@ngrx/store';
import { getConfigurationLoaded } from './configuration/store/configuration.selectors';
import { AuthenticationActions } from './authentication/store/authentication.actions';
import { Utils } from './utilities/utils';
import {
  Subject,
  Subscription,
  filter,
  interval,
  merge,
  takeUntil,
  takeWhile,
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
  private stopSubject = new Subject<void>();
  private shouldContinue = true;
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
    this.store.dispatch(AuthenticationActions.weatherForcast());
    this.store
      .select(getWeatherForecastSuccess)
      .pipe(filter((success) => !success)) // Only proceed when the subscription is false
      .subscribe(() => {
        console.log('Getting weather forecast');
        interval(10000) // 10 seconds
          .pipe(takeWhile(() => this.shouldContinue))
          .subscribe(() => {
            console.log('Dispatching weather forecast');
            this.store.dispatch(AuthenticationActions.weatherForcast());
          });
      });

    // Set the timeout
    setTimeout(() => {
      this.shouldContinue = false;
    }, 600000); // 10 minutes
  }

  ngOnDestroy(): void {
    if (this.getConfigurationLoadedSubscription) {
      Utils.Unsubscribe(this.getConfigurationLoadedSubscription);
    }
    this.stopSubject.next();
    this.stopSubject.complete();
  }
}
