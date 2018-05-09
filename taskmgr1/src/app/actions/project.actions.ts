import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { type } from './../utils/type.util';
import { Auth } from '../domain/auth.model';
import { Project } from '../domain/index';

// export const ADD = '[Project] ADD';
// export const ADD_SUCCESS = '[Project] Add Success';
// export const ADD_FAIL = '[Project] Add Fail';
// export const UPDATE = '[Project] Update';
// export const UPDATE_SUCCESS = '[Project] Update Success';
// export const UPDATE_FAIL = '[Project] Update Fail';
// export const DELETE = '[Project] Delete';
// export const DELETE_SUCCESS = '[Project] Delete Success';
// export const DELETE_FAIL = '[Project] Delete Fail';
// export const LOADS = '[Project] Load';
// export const LOADS_SUCCESS = '[Project] Load Success';
// export const LOADS_FAIL = '[Project] Load Fail';
// export const SELECT = '[Project] Select Project';


export const ActionTypes = {
    ADD: type('[Project] Add'),
    ADD_SUCCESS: type('[Project] Add Success'),
    ADD_FAIL: type('[Project] Add Fail'),
    UPDATE: type('[Project] Update'),
    UPDATE_SUCCESS: type('[Project] Update Success'),
    UPDATE_FAIL: type('[Project] Update Fail'),
    DELETE: type('[Project] Delete'),
    DELETE_SUCCESS: type('[Project] Delete Success'),
    DELETE_FAIL: type('[Project] Delete Fail'),
    LOAD: type('[Project] Load'),
    LOAD_SUCCESS: type('[Project] Load Success'),
    LOAD_FAIL: type('[Project] Load Fail'),
    SELECT_PROJECT: type('[Project] Select Project'),
    INVITE: type('[Project] Invite Members'),
    INVITE_SUCCESS: type('[Project] Invite Members Success'),
    INVITE_FAIL: type('[Project] Invite Members Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

// export class AddProjectAction implements Action {
//     readonly type = ADD;

//     constructor(public payload: Project) {
//     }
// }

// export class AddProjectSuccessAction implements Action {
//     readonly type = ADD_SUCCESS;

//     constructor(public payload: Project) {
//     }
// }

// export class AddProjectFailAction implements Action {
//     readonly type = ADD_FAIL;

//     constructor(public payload: string) {
//     }
// }

// export class UpdateProjectAction implements Action {
//     readonly type = UPDATE;

//     constructor(public payload: Project) {
//     }
// }

// export class UpdateProjectSuccessAction implements Action {
//     readonly type = UPDATE_SUCCESS;

//     constructor(public payload: Project) {
//     }
// }

// export class UpdateProjectFailAction implements Action {
//     readonly type = UPDATE_FAIL;

//     constructor(public payload: string) {
//     }
// }
// export class DeleteProjectAction implements Action {
//     readonly type = DELETE;

//     constructor(public payload: Project) {
//     }
// }

// export class DeleteProjectSuccessAction implements Action {
//     readonly type = DELETE_SUCCESS;

//     constructor(public payload: Project) {
//     }
// }

// export class DeleteProjectFailAction implements Action {
//     readonly type = DELETE_FAIL;

//     constructor(public payload: string) {
//     }
// }

// export class LoadProjectsAction implements Action {
//     readonly type = LOADS;
// }

// export class LoadProjectsSuccessAction implements Action {
//     readonly type = LOADS_SUCCESS;

//     constructor(public payload: Project[]) {
//     }
// }

// export class LoadProjectsFailAction implements Action {
//     readonly type = LOADS_FAIL;

//     constructor(public payload: string) {
//     }
// }

// export class SelectProjectAction implements Action {
//     readonly type = SELECT;

//     constructor(public payload: Project) {
//     }
// }

export class AddProjectAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: Project) {
    }
}

export class AddProjectSuccessAction implements Action {
    type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class AddProjectFailAction implements Action {
    type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateProjectAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: Project) {
    }
}

export class UpdateProjectSuccessAction implements Action {
    type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class UpdateProjectFailAction implements Action {
    type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteProjectAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: Project) {
    }
}

export class DeleteProjectSuccessAction implements Action {
    type = ActionTypes.DELETE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class DeleteProjectFailAction implements Action {
    type = ActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadProjectsAction implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: any) {
    }
}

export class LoadProjectsSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class LoadProjectsFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) {
    }
}

export class SelectProjectAction implements Action {
    type = ActionTypes.SELECT_PROJECT;

    constructor(public payload: Project) {
    }
}


export class InviteMembersAction implements Action {
    type = ActionTypes.INVITE;

    constructor(public payload: { projectId: string; members: User[] }) {
    }
}

export class InviteMembersSuccessAction implements Action {
    type = ActionTypes.INVITE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class InviteMembersFailAction implements Action {
    type = ActionTypes.INVITE_FAIL;

    constructor(public payload: string) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = AddProjectAction
    | AddProjectSuccessAction
    | AddProjectFailAction
    | UpdateProjectAction
    | UpdateProjectSuccessAction
    | UpdateProjectFailAction
    | DeleteProjectAction
    | DeleteProjectSuccessAction
    | DeleteProjectFailAction
    | LoadProjectsAction
    | LoadProjectsSuccessAction
    | LoadProjectsFailAction
    | SelectProjectAction
    | InviteMembersAction
    | InviteMembersSuccessAction
    | InviteMembersFailAction;
