import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  public apiHost: string = environment.apiHost;

  public apiPrefix: string = environment.apiPrefix;

  /**
   * e.g. https://apihost.com/api/v1
   */
  public get apiUrl(): string {
    return `${this.apiHost}${this.apiPrefix}`;
  }

}
