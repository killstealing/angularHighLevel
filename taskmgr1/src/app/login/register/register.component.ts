import { Auth } from './../../domain/auth.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { isValidAddr, getAddrByCode, extractInfo } from './../../utils/identity.util';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { isValidDate } from '../../utils/date.utils';
import * as authActions from '../../actions/auth.actions';
import * as authReducers from '../../reducers/auth.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;
  items: string[];
  private readonly avatarName = 'avatars';
  constructor(private fb: FormBuilder, private store$: Store<authReducers.AuthState>) {
  }
  ngOnInit() {
    let img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    if (img === 'avatars:svg-0') {
      img = 'avatars:svg-1';
    }
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
      address: [],
      identity: [],
    });
    console.log(JSON.stringify(this.form.value));
    const id$ = this.form.get('identity').valueChanges.debounceTime(300)
      .filter(_ => this.form.get('identity').valid);
    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // form={value,valid}
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(new authActions.RegisterAction(value));
  }


}
