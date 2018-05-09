import { User } from './../domain/user.model';
import { LoginFailAction, LogoutAction, REGISTER_SUCCESS, RegisterSuccessAction } from './../actions/auth.actions';
import { AuthService } from './../services/auth.service';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as actions from '../actions/auth.actions';
import * as routerActions from '../actions/router.actions';
import { switchMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private service$: AuthService) { }

    @Effect() login$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.LoginAction>(actions.LOGIN),
        map((action: actions.LoginAction) => action.payload),
        switchMap((val: { email, password }) => this.service$
            .login(val.email, val.password)
            .pipe(
            map(auth => new actions.LoginSuccessAction(auth)),
            catchError(err => of(new actions.LoginFailAction(err)))
            )
        )
        );

    @Effect() register$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.RegisterAction>(actions.REGISTER),
        map((action: actions.RegisterAction) => action.payload),
        switchMap((val: User) => this.service$.register(val)
            .pipe(
            map(auth => new actions.RegisterSuccessAction(auth)),
            catchError(err => of(new actions.RegisterFailAction(err)))
            )),
    );

    @Effect() logout$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.LogoutAction>(actions.LOGOUT),
        map(_ => new routerActions.GoAction({ path: ['/'] }))
        );

    @Effect() loginAndNavigate$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.LoginSuccessAction>(actions.LOGIN_SUCCESS),
        map(_ => new routerActions.GoAction({ path: ['/projects'] }))
        );

    @Effect() registerAndNavigate$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.RegisterSuccessAction>(actions.REGISTER_SUCCESS),
        map(_ => new routerActions.GoAction({ path: ['/projects'] }))
        );
}
