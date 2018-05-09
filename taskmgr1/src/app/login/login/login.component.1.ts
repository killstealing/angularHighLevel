import { Quote } from './../../domain/quote.model';
import { QuoteService } from './../../services/quote.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
    en: 'Satisfaction lies in the effort,not in the attainment.Full effort is full',
    pic: '/assets/test.jpg',
  };

  constructor(private fb: FormBuilder, private quoteServie$: QuoteService) {
    this.quoteServie$.getQuote().subscribe(q => this.quote = q);
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
