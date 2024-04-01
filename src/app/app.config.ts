import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { configurationReducer } from './configuration/store/configuration.reducer';
import { ConfigurationEffects } from './configuration/store/configuration.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiClient } from './utilities/api-client';
import { authenticationReducer } from './authentication/store/authentication.reducer';
import { AuthenticationEffects } from './authentication/store/authentication.effects';
import { tokenInterceptor } from './utilities/token-interceptor';
import { errorInterceptor } from './utilities/error-interceptor';
import { AccountsEffects } from './accounts/store/accounts.effects';
import { accountsReducer } from './accounts/store/accounts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      configuration: configurationReducer,
      authentication: authenticationReducer,
      accounts: accountsReducer,
    }),
    provideEffects(
      ConfigurationEffects,
      AuthenticationEffects,
      AccountsEffects
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
    {
      provide: ApiClient,
      useClass: ApiClient,
    },
  ],
};
