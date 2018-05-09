import { Observable } from 'rxjs/Observable';
import { Quote } from './../../domain/quote.model';
import { QuoteService } from './../../services/quote.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as rootReducer from '../../reducers/reducers';
import * as quoteReducer from '../../reducers/quote.reducer';
import * as quoteActions from '../../actions/quote.actions';
import * as authActions from '../../actions/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private fb: FormBuilder, private store$: Store<rootReducer.AppState>) {
    this.quote$ = this.store$.select(rootReducer.getQuote);
    this.store$.dispatch(new quoteActions.QuoteAction);
  }

  ngOnInit() {

    this.form = this.fb.group({
      email: ['liming@163.com', Validators.compose([
        Validators.required,
        Validators.email,
        // this.validate
      ])],
      password: ['Lm123456', Validators.required]
    });
  }

  onSubmit(form, ev: Event) {
    ev.preventDefault();
    if (!form.valid) {
      return;
    }
    this.store$.dispatch(new authActions.LoginAction(form.value));
  }

  // validate(c: FormControl): { [key: string]: any } {
  //   if (!c.value) {
  //     return null;
  //   }

  //   const pattern = /^wang+/;
  //   if (pattern.test(c.value)) {
  //     return null;
  //   }
  //   return {
  //     emailNotValid: 'The email must start with wang'
  //   };
  // }

}
