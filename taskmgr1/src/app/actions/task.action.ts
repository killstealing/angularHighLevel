import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { type } from './../utils/type.util';
import { Auth } from '../domain/auth.model';
import { Task } from '../domain/task.model';
import { TaskList } from '../domain/task-list.model';

export const ActionTypes = {
    ADD: type('[Task] Add'),
    ADD_SUCCESS: type('[Task] Add Success'),
    ADD_FAIL: type('[Task] Add Fail'),
    UPDATE: type('[Task] Update'),
    UPDATE_SUCCESS: type('[Task] Update Success'),
    UPDATE_FAIL: type('[Task] Update Fail'),
    DELETE: type('[Task] Delete'),
    DELETE_SUCCESS: type('[Task] Delete Success'),
    DELETE_FAIL: type('[Task] Delete Fail'),
    LOAD: type('[Task] Load'),
    LOAD_SUCCESS: type('[Task] Load Success'),
    LOAD_FAIL: type('[Task] Load Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class AddTaskAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: Task) {
    }
}

export class AddTaskSuccessAction implements Action {
    type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Task) {
    }
}

export class AddTaskFailAction implements Action {
    type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateTaskAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: Task) {
    }
}

export class UpdateTaskSuccessAction implements Action {
    type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Task) {
    }
}

export class UpdateTaskFailAction implements Action {
    type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteTaskAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: Task) {
    }
}

export class DeleteTaskSuccessAction implements Action {
    type = ActionTypes.DELETE_SUCCESS;

    constructor(public payload: Task) {
    }
}

export class DeleteTaskFailAction implements Action {
    type = ActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadTasksAction implements Action {
    type = ActionTypes.LOAD;
    // projectId
    constructor(public payload: TaskList[]) {
    }
}

export class LoadTasksSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Task[]) {
    }
}

export class LoadTasksFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) {
    }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = AddTaskAction
    | AddTaskSuccessAction
    | AddTaskFailAction
    | UpdateTaskAction
    | UpdateTaskSuccessAction
    | UpdateTaskFailAction
    | DeleteTaskAction
    | DeleteTaskSuccessAction
    | DeleteTaskFailAction
    | LoadTasksAction
    | LoadTasksSuccessAction
    | LoadTasksFailAction;
