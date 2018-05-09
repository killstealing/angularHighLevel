import { User } from './../domain/user.model';
import { ProjectService } from './../services/project.service';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as actions from '../actions/project.actions';
import * as rootReducer from '../reducers/reducers';
import * as routerActions from '../actions/router.actions';
import * as taskListAction from '../actions/task-list.action';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Project } from '../domain/index';


@Injectable()
export class ProjectEffects {
    constructor(private actions$: Actions, private service$: ProjectService,
        private router: Router, private store$: Store<rootReducer.AppState>) { }

    @Effect()
    loadProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.LoadProjectsAction>(actions.ActionTypes.LOAD),
        withLatestFrom(this.store$.select(rootReducer.getAuth)),
        switchMap(([_, auth]) => {
            if (auth == null) {
                return of(new actions.LoadProjectsFailAction(JSON.stringify('Please login')));
            }
            return this.service$.get(auth.userId).
                pipe(
                map(projects => new actions.LoadProjectsSuccessAction(projects)),
                catchError(err => of(new actions.LoadProjectsFailAction(JSON.stringify(err))))
                );
        }
        ));

    @Effect()
    addProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.AddProjectAction>(actions.ActionTypes.ADD),
        withLatestFrom(this.store$.select(rootReducer.getAuth)),
        switchMap(([project, auth]) => {
            const added = {
                ...project.payload, members: [`${auth.user.id}`]
            };
            return this.service$.add(added).pipe(
                map(returned => new actions.AddProjectSuccessAction(returned)),
                catchError(err => of(new actions.AddProjectFailAction(JSON.stringify(err))))
            );
        }));

    @Effect()
    updateProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.UpdateProjectAction>(actions.ActionTypes.UPDATE),
        map(action => action.payload),
        switchMap(project => this.service$.update(project)
            .pipe(
            map(returned => new actions.UpdateProjectSuccessAction(returned)),
            catchError(err => of(new actions.UpdateProjectFailAction(JSON.stringify(err))))
            )
        ));

    @Effect()
    delProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.DeleteProjectAction>(actions.ActionTypes.DELETE),
        map(action => action.payload),
        switchMap(project => this.service$.del(project)
            .pipe(
            map(returned => new actions.DeleteProjectSuccessAction(returned)),
            catchError(err => of(new actions.DeleteProjectFailAction(JSON.stringify(err))))
            )
        ));

    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.SelectProjectAction>(actions.ActionTypes.SELECT_PROJECT),
        map(action => action.payload),
        map(project => new routerActions.GoAction({ path: [`/tasklists/${project.id}`] }))
        );

    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.SelectProjectAction>(actions.ActionTypes.SELECT_PROJECT),
        map(action => action.payload),
        map(project => new taskListAction.LoadTaskListsAction(project.id))
        );

    @Effect()
    inviteMembers$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.InviteMembersAction>(actions.ActionTypes.INVITE),
        map(action => action.payload),
        switchMap(({ projectId, members }) =>
            this.service$.inviteMembers(projectId, members)
                .pipe(
                map(res => res.json() as Project),
                map(project => new actions.InviteMembersSuccessAction(project)),
                catchError(err => of(new actions.InviteMembersFailAction(JSON.stringify(err))))
                )
        ));
}
