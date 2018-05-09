import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Observable } from 'rxjs/Rx';
export interface DragData {
  tag: string;
  data: any;
}
@Injectable()
export class DragDropService {
  private _dragData = new BehaviorSubject<DragData>(null);
  setDragData(data: DragData) {
    this._dragData.next(data);
  }
  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }
  clearDragData() {
    this._dragData.next(null);
  }
  constructor() { }
}
