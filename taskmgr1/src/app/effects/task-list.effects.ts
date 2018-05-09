import { TaskListService } from './../services/task-list.service';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as actions from '../actions/task-list.action';
import * as rootReducer from '../reducers/reducers';
import * as routerActions from '../actions/router.actions';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TaskList, User } from '../domain/index';

@Injectable()
export class TaskListEffects {
    constructor(private actions$: Actions, private service$: TaskListService,
        private router: Router, private store$: Store<rootReducer.AppState>) { }

    @Effect()
    loadTaskList$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.LoadTaskListsAction>(actions.ActionTypes.LOAD),
        map(action => action.payload),
        switchMap(projectId => {
            return this.service$.get(projectId).
                pipe(
                map(taskLists => new actions.LoadTaskListsSuccessAction(taskLists)),
                catchError(err => of(new actions.LoadTaskListsFailAction(JSON.stringify(err))))
                );
        }
        ));

    // @Effect()
    // loadTaskListSuccess$: Observable<Action> = this.store$
    //     .pipe(
    //     ofType<actions.LoadTaskListsSuccessAction>(actions.ActionTypes.LOAD_SUCCESS),
    //     map(action => new routerActions.GoAction({ path: [`/tasklists/${action.payload}`] })
    //     ));

    @Effect()
    addTaskList$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.AddTaskListAction>(actions.ActionTypes.ADD),
        map(action => action.payload),
        switchMap(taskList => {
            return this.service$.add(taskList).pipe(
                map(returned => new actions.AddTaskListSuccessAction(returned)),
                catchError(err => of(new actions.AddTaskListFailAction(JSON.stringify(err))))
            );
        }));

    @Effect()
    updateTaskList$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.UpdateTaskListAction>(actions.ActionTypes.UPDATE),
        map(action => action.payload),
        switchMap(taskList => this.service$.update(taskList)
            .pipe(
            map(returned => new actions.UpdateTaskListSuccessAction(returned)),
            catchError(err => of(new actions.UpdateTaskListFailAction(JSON.stringify(err))))
            )
        ));

    @Effect()
    delTaskList$: Observable<Action> = this.actions$
        .pipe(
        ofType<actions.DeleteTaskListAction>(actions.ActionTypes.DELETE),
        map(action => action.payload),
        switchMap(taskList => this.service$.del(taskList)
            .pipe(
            map(returned => new actions.DeleteTaskListSuccessAction(returned)),
            catchError(err => of(new actions.DeleteTaskListFailAction(JSON.stringify(err))))
            )
        ));
}
