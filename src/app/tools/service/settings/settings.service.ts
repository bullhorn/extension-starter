import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as shajs from 'sha.js';

import { environment } from '../../../../environments/environment';
import {Configuration} from './settings.types';

@Injectable()
export class SettingsService {

  private static CORPORATION_ID = /CorporationID=(.*?)(&|$)/;
  private static SHA_256 = shajs('sha256');

  private corporationId: number;

  constructor(private httpClient: HttpClient, location: Location) {
    this.corporationId = this.parseCorporationId(location);
  }

  getSettings(): Promise<Configuration> {
    return new Promise<Configuration>( resolve => {
      this.httpClient.get<Configuration>( this.constructUrl(), {
        headers: new HttpHeaders().set('Authorization', this.getAuthorization())
      } ).subscribe(data => {
        resolve(data);
      }, error => {
        console.error('Error occurred resolving settings', error);

        resolve({
          corporationId: this.corporationId,
          data: '',
          appId: environment.settingsConfig.title,
          enabled: true
        });
      });
    });
  }

  private constructUrl(): string {
    return `${environment.settingsConfig.url}?corporationId=${this.corporationId}&appId=${environment.settingsConfig.title}`;
  }

  private getAuthorization(): string {
    const key = `${environment.settingsConfig.authKey}${this.corporationId}${environment.settingsConfig.title}`;

    return SettingsService.SHA_256.update(key).digest('hex');
  }

  private parseCorporationId(location: Location): number {
    const corporationId: number = parseInt(location.path().match(SettingsService.CORPORATION_ID)[1], 10);

    if (isNaN(corporationId)) {
      return 0;
    }

    return corporationId;
  }

}
