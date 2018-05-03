import { Action } from '@ngrx/store';
import { Article } from '../domain/article.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ClassActionTypes {
    JAVA = '[Class] Java',
    ANGULAR = '[Class] Angular',
    FAVORITE = '[Class] Favorite',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class JavaArticleAction implements Action {
    readonly type = ClassActionTypes.JAVA;
}

export class AngularArticleAction implements Action {
    readonly type = ClassActionTypes.ANGULAR;
}
export class FavoriteArticleAction implements Action {
    readonly type = ClassActionTypes.FAVORITE;

    constructor(public payload: Article[]) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = JavaArticleAction
    | AngularArticleAction
    | FavoriteArticleAction;
