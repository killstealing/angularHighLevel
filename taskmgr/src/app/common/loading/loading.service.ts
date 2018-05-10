import { Injectable } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadingService {
  public static loading: LoadingComponent;
  constructor() { }

  open(): void {
    LoadingService.loading.open();
  }

  close(): void {
    LoadingService.loading.close();
  }

}
