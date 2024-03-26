import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaceholderHomePageComponent } from './placeholder-home-page/placeholder-home-page.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ConfigurationService } from './configuration/store/configuration.service';
import { Store } from '@ngrx/store';
import { getConfigurationLoaded } from './configuration/store/configuration.selectors';
import { AuthenticationActions } from './authentication/store/authentication.actions';
import { Utils } from './utilities/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlaceholderHomePageComponent, LayoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private subscription: Subscription | undefined;
  constructor(
    private configurationService: ConfigurationService,
    private store: Store<any>
  ) {
    this.configurationService.initialLoad();
    this.subscription = this.store.select(getConfigurationLoaded).subscribe({
      next: (loaded) => {
        if (loaded) {
          this.store.dispatch(AuthenticationActions.refreshToken());
        }
      },
    });
  }
  ngOnDestroy(): void {
    Utils.Unsubscribe(this.subscription || []);
  }
}
