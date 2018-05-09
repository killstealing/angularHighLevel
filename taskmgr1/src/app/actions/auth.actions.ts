import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { type } from './../utils/type.util';
import { Auth } from '../domain/auth.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAIL = '[Auth] Register Fail';
export const LOGOUT = '[Auth] Logout';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoginAction implements Action {
    readonly type = LOGIN;

    constructor(public payload: { email: string; password: string }) { }
}

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: Auth) { }
}

export class LoginFailAction implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: any) { }
}

export class RegisterAction implements Action {
    readonly type = REGISTER;
    constructor(public payload: User) { }
}

export class RegisterSuccessAction implements Action {
    readonly type = REGISTER_SUCCESS;
    constructor(public payload: Auth) { }
}

export class RegisterFailAction implements Action {
    readonly type = REGISTER_FAIL;
    constructor(public payload: string) { }
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
    constructor(public payload: null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailAction
    | LogoutAction;
