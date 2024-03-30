import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutService } from '../../layout/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationActions } from '../store/authentication.actions';
import {
  getVerifyEmailResponse,
  getWeatherForecastSuccess,
} from '../store/authentication.selectors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ServiceResponseModel } from '../../models/service-response.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoginBottomSheetComponent } from '../login-bottom-sheet/login-bottom-sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressBar],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  verificationResponse: ServiceResponseModel<string> | undefined | null;
  getVerifyEmailResponseSubscription: Subscription | undefined;
  getWeatherForecastSuccessSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>,
    private layoutService: LayoutService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnDestroy(): void {
    if (this.getVerifyEmailResponseSubscription) {
      this.getVerifyEmailResponseSubscription.unsubscribe();
    }
    if (this.getWeatherForecastSuccessSubscription) {
      this.getWeatherForecastSuccessSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (!token) {
      this.router.navigate(['/']);
      return;
    }
    this.getWeatherForecastSuccessSubscription = this.store
      .select(getWeatherForecastSuccess)
      .subscribe({
        next: (response) => {
          if (response) {
            this.verifyEmail(token);
          }
        },
      });
  }

  verifyEmail(token: string): void {
    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
    this.store.dispatch(
      AuthenticationActions.verifyEmail({ model: { token } })
    );
    this.getVerifyEmailResponseSubscription = this.store
      .select(getVerifyEmailResponse)
      .subscribe({
        next: (response) => {
          this.verificationResponse = response;
        },
        error: () => {
          this.layoutService.showMessage('Verification failed');
        },
      });
  }

  openLogin() {
    this.bottomSheet.open(LoginBottomSheetComponent, {
      data: { email: this.verificationResponse?.data },
    });
  }
}
