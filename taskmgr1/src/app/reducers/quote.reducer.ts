import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Quote } from './../domain/quote.model';
import * as fromActions from './../actions/quote.actions';

export interface QuoteState {
    quote: Quote;
}

export const initialState: QuoteState = {
    quote: {
        cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
        en: 'Satisfaction lies in the effort,not in the attainment.Full effort is full',
        pic: '/assets/test.jpg',
    }
};

export function reducer(state = initialState, action: fromActions.All): QuoteState {
    switch (action.type) {
        case fromActions.QUOTE_SUCCESS: {
            return {
                ...state,
                quote: action.payload
            };
        }
        case fromActions.QUOTE_FAIL:
        default: {
            return state;
        }
    }
}
