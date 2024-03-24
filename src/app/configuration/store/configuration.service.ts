import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';
import { ConfigurationActions } from './configuration.actions';
import { ConfigurationDataService } from './configuration.data-service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends ConfigurationDataService {
  constructor(
    protected override api: ApiClient,
    protected override store: Store<any>
  ) {
    super(api, store);
  }

  initialLoad() {
    console.log('ConfigurationService.initialLoad');
    this.store.dispatch(ConfigurationActions.loadConfigurationSettings());
  }
}
