import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  public theme: any;
  public ifSwitchTheme: any;

  constructor() {
    this.theme = 'myapp-dark-theme';
  }

}
