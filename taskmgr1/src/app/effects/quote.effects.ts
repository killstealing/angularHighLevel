import { QuoteService } from './../services/quote.service';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as actions from '../actions/quote.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class QuoteEffects {
    @Effect() quote$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.QuoteAction>(actions.QUOTE),
            switchMap(() => this.service$.getQuote()
                .pipe(
                map(quote => new actions.QuoteSuccessAction(quote)),
                catchError(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
                )
            )
        );
    // quote$: Observable<Action> = this.actions$.ofType(actions.QUOTE)
    //     .switchMap(_ => this.service$.getQuote()
    //         .map(q => new actions.QuoteSuccessAction(q))
    //         .catch(err => Observable.of(new actions.QuoteFailAction(JSON.stringify(err))))
    //     );

    constructor(private actions$: Actions, private service$: QuoteService) { }
}
