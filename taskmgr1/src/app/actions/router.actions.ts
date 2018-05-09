import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { type } from './../utils/type.util';
import { Auth } from '../domain/auth.model';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class GoAction implements Action {
    readonly type = GO;

    constructor(public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) { }
}

export class BackAction implements Action {
    readonly type = BACK;
}

export class ForwardAction implements Action {
    readonly type = FORWARD;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = GoAction
    | BackAction
    | ForwardAction;
