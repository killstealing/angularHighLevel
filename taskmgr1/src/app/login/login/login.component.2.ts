import { Observable } from 'rxjs/Observable';
import { Quote } from './../../domain/quote.model';
import { QuoteService } from './../../services/quote.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as rootReducer from '../../reducers/reducers';
import * as quoteActions from '../../actions/quote.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private fb: FormBuilder, private quoteServie$: QuoteService,
    private store$: Store<rootReducer.AppState>) {
    this.quote$ = this.store$.select(rootReducer.getQuote);
    this.quoteServie$.getQuote().subscribe(q => {
      return this.store$.dispatch(new quoteActions.QuoteSuccessAction(q));
    });
  }

  ngOnInit() {

    this.form = this.fb.group({
      email: ['wang@local.dev', Validators.compose([
        Validators.required,
        Validators.email,
        this.validate
      ])],
      password: ['', Validators.required]
    });
  }

  onSubmit(form, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(form.value));
    console.log(JSON.stringify(form.valid));
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }

    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with wang'
    };
  }

}
