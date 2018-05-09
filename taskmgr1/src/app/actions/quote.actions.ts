import { Quote } from './../domain/quote.model';
import { Action } from '@ngrx/store';
import { type } from './../utils/type.util';

export const QUOTE = '[Quote] Quote';
export const QUOTE_SUCCESS = '[Quote] Quote Success';
export const QUOTE_FAIL = '[Quote] Quote Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class QuoteAction implements Action {
    readonly type = QUOTE;
}

export class QuoteSuccessAction implements Action {
    readonly type = QUOTE_SUCCESS;
    constructor(public payload: Quote) { }
}

export class QuoteFailAction implements Action {
    readonly type = QUOTE_FAIL;
    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
    = QuoteAction
    | QuoteSuccessAction
    | QuoteFailAction;
