export const QUOTE = '[Quote] Quote';
export const QUOTE_SUCCESS = '[Quote] Quote Success';
export const QUOTE_FAIL = '[Quote] Quote Fail';

import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum QuoteActionTypes {
    Quote = '[class] Quote',
    QuoteSuccess = '[class] QuoteSuccess',
    QuoteFail = '[class] QuoteFail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class QuoteAction implements Action {
    readonly type = QuoteActionTypes.Quote;
    constructor(public payload: payloadType) { }
}

export class QuoteSuccessAction implements Action {
    readonly type = QuoteActionTypes.QuoteSuccess;

    constructor(public payload: payloadType2) { }
}
export class QuoteFailAction implements Action {
    readonly type = QuoteActionTypes.QuoteFail;

    constructor(public payload: payloadType2) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type QuoteActions
                        = Verb1
                        | Verb2;
