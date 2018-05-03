import * as fromActions from './../actions/quote.action';
import { Quote } from '../domain/quote.model';

export interface QuoteState {
    quote: Quote;
}

const initialState: QuoteState = {
    quote: new Quote();
};

export function reducer(state = initialState, action: { type: string; payload: any }): QuoteState {
    switch (action.type) {
        case fromActions.QUOTE_SUCCESS: {
            return { ...state, quote: action.payload };
        }
        default: {
            return state;
        }
    }
}
