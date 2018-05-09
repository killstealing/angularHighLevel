import { Action } from '@ngrx/store';
import { Article } from '../domain/article.model';

export const JAVA = 'Java';
export const ANGULAR = 'Angular';
export const MY_ARTICLES = 'Favorite_Articles';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class JavaArticlesAction implements Action {
    readonly type = JAVA;
}

export class AngularArticlesAction implements Action {
    readonly type = ANGULAR;
}

export class FavoriteArticlesAction implements Action {
    readonly type = MY_ARTICLES;
    constructor(public payload: Article[]) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
    = JavaArticlesAction
    | AngularArticlesAction
    | FavoriteArticlesAction;
