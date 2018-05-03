import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<Quote[]> {
    return this.http.get('/api/quotes') as Observable<Quote[]>;
  }
  getRandomQuote(): Observable<Quote> {
    return this.http.get('/api/quote').pipe(map(data => data)) as Observable<Quote>;
  }
}
