import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { type } from './../utils/type.util';
import { Auth } from '../domain/auth.model';
import { TaskList } from '../domain/index';

export const ActionTypes = {
    ADD: type('[TaskList] Add'),
    ADD_SUCCESS: type('[TaskList] Add Success'),
    ADD_FAIL: type('[TaskList] Add Fail'),
    UPDATE: type('[TaskList] Update'),
    UPDATE_SUCCESS: type('[TaskList] Update Success'),
    UPDATE_FAIL: type('[TaskList] Update Fail'),
    DELETE: type('[TaskList] Delete'),
    DELETE_SUCCESS: type('[TaskList] Delete Success'),
    DELETE_FAIL: type('[TaskList] Delete Fail'),
    LOAD: type('[TaskList] Load'),
    LOAD_SUCCESS: type('[TaskList] Load Success'),
    LOAD_FAIL: type('[TaskList] Load Fail'),
    SWAP: type('[TaskList] Swap TaskList'),
    SWAP_SUCCESS: type('[TaskList] Swap TaskList Success'),
    SWAP_FAIL: type('[TaskList] Swap TaskList Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class AddTaskListAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: TaskList) {
    }
}

export class AddTaskListSuccessAction implements Action {
    type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: TaskList) {
    }
}

export class AddTaskListFailAction implements Action {
    type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateTaskListAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: TaskList) {
    }
}

export class UpdateTaskListSuccessAction implements Action {
    type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: TaskList) {
    }
}

export class UpdateTaskListFailAction implements Action {
    type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteTaskListAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: TaskList) {
    }
}

export class DeleteTaskListSuccessAction implements Action {
    type = ActionTypes.DELETE_SUCCESS;

    constructor(public payload: TaskList) {
    }
}

export class DeleteTaskListFailAction implements Action {
    type = ActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadTaskListsAction implements Action {
    type = ActionTypes.LOAD;
    // projectId
    constructor(public payload: string) {
    }
}

export class LoadTaskListsSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: TaskList[]) {
    }
}

export class LoadTaskListsFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) {
    }
}

export class SwapTaskListAction implements Action {
    type = ActionTypes.SWAP;

    constructor(public payload: { src: TaskList; target: TaskList }) {
    }
}

export class SwapTaskListSuccessAction implements Action {
    type = ActionTypes.SWAP_SUCCESS;

    constructor(public payload: TaskList[]) {
    }
}

export class SwapTaskListFailAction implements Action {
    type = ActionTypes.SWAP_FAIL;

    constructor(public payload: string) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = AddTaskListAction
    | AddTaskListSuccessAction
    | AddTaskListFailAction
    | UpdateTaskListAction
    | UpdateTaskListSuccessAction
    | UpdateTaskListFailAction
    | DeleteTaskListAction
    | DeleteTaskListSuccessAction
    | DeleteTaskListFailAction
    | LoadTaskListsAction
    | LoadTaskListsSuccessAction
    | LoadTaskListsFailAction
    | SwapTaskListAction
    | SwapTaskListSuccessAction
    | SwapTaskListFailAction;
