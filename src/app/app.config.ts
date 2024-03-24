import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { configurationReducer } from './configuration/store/configuration.reducer';
import { ConfigurationEffects } from './configuration/store/configuration.effects';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApiClient } from './utilities/api-client';
import { ApiInterceptor } from './utilities/api-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      configuration: configurationReducer,
    }),
    provideEffects(ConfigurationEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
    ApiClient,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
};
