import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as rootReducer from '../../reducers/reducers';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Auth } from '../../domain/auth.model';
import * as authActions from '../../actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  auth$: Observable<Auth>;

  @Output()
  toggle = new EventEmitter<void>();

  @Output()
  toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$: Store<rootReducer.AppState>) {
    this.auth$ = this.store$.pipe(select(rootReducer.getAuth));
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout() {
    this.store$.dispatch(new authActions.LogoutAction(null));
  }

}
