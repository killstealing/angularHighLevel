import { Auth } from './../domain/auth.model';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as rootReducer from '../reducers/reducers';
import * as authReducer from '../reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import * as routerActions from '../actions/router.actions';
import { map, take, defaultIfEmpty } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private store$: Store<rootReducer.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        console.log('aaa');
        return this.store$.pipe(
            select(rootReducer.getAuthState),
            map(auth => {
                console.log('auth', JSON.stringify(auth));
                const result = auth.auth !== null && auth.auth.token !== null;
                if (!result) {
                    console.log('result ', result);
                    this.store$.dispatch(new routerActions.GoAction({ path: ['/login'] }));
                }
                return result;
            }),
            defaultIfEmpty(false),
            take(1)
        );
    }
}
