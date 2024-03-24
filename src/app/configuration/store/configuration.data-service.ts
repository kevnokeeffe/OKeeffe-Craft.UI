import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ApiClient } from '../../utilities/api-client';
import { ConfigurationSettingsModel } from '../models/configuration.settings.model';

export class ConfigurationDataService {
  constructor(protected api: ApiClient, protected store: Store<any>) {}

  load(): Observable<ConfigurationSettingsModel> {
    console.log('Loading configuration settings');
    return this.api.http.get<ConfigurationSettingsModel>(environment.settings);
  }
}
