import { Auth } from './../domain/auth.model';
import * as actions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
    auth: Auth;
}

export const initialState: AuthState = {
    auth: null
};

export function reducer(state = initialState, action: actions.Actions): AuthState {
    switch (action.type) {
        case actions.REGISTER_SUCCESS:
        case actions.LOGIN_SUCCESS: {
            const auth = action.payload;
            return {
                ...state,
                auth: {
                    token: auth.token,
                    userId: auth.user ? auth.user.id : undefined
                }
            };
        }
        case actions.REGISTER_FAIL:
        case actions.LOGIN_FAIL: {
            return { ...state, auth: { err: <string>action.payload } };
        }
        case actions.LOGOUT: {
            return {
                auth: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
