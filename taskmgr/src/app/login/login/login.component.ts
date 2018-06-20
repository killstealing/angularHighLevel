import { QuoteService } from './../../service/quote.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Quote } from '../../domain/quote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  quote: Quote;
  dynamicCondition: string;
  constructor(private fb: FormBuilder, private quoteSerivce: QuoteService,
    private router: Router) {
    this.formModel = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.validate]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.quoteSerivce.getRandomQuote().subscribe(quote => this.quote = quote);
  }

  login(ev: Event) {
    ev.preventDefault();
    if (!this.formModel.valid) {
      return false;
    }
    // if (this.dynamicCondition === '') {
    //   this.formModel.controls['email'].setValidators(this.validate);
    // }
    this.router.navigate(['/projectList']);
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
