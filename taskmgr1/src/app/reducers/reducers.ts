import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from './../../environments/environment';
import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import * as articleReducer from './article.reducer';
import * as quoteReducer from './quote.reducer';
import * as authReducer from './auth.reducer';
import * as projectReducer from './project.reducer';
import * as taskListReducer from './task-list.reducer';
import { ArticleState } from './article.reducer';
import { QuoteState } from './quote.reducer';
import { AuthState } from './auth.reducer';
import { ProjectState } from './project.reducer';
import { TaskListState } from './task-list.reducer';
import * as authActions from '../actions/auth.actions';

export interface AppState {
    articleState: ArticleState;
    quoteState: QuoteState;
    authState: AuthState;
    projectState: ProjectState;
    taskListState: TaskListState;
}

export const reducers: ActionReducerMap<AppState> = {
    articleState: articleReducer.reducer,
    quoteState: quoteReducer.reducer,
    authState: authReducer.reducer,
    projectState: projectReducer.reducer,
    taskListState: taskListReducer.reducer
};

export const getQuoteState = createFeatureSelector<QuoteState>('quoteState');
export const getArticleState = createFeatureSelector<ArticleState>('articleState');
export const getAuthState = createFeatureSelector<AuthState>('authState');
export const getProjectState = createFeatureSelector<ProjectState>('projectState');
export const getTaskListState = createFeatureSelector<TaskListState>('taskListState');

export const getQuote = createSelector(
    getQuoteState, (state: QuoteState) => state.quote
);
export const getArticles = createSelector(
    getArticleState, (state: ArticleState) => state.articles
);
export const getAuth = createSelector(
    getAuthState, (state: AuthState) => state.auth
);
export const getSelectedId = createSelector(
    getProjectState, (state: ProjectState) => state.selectedId
);
export const getEntities = createSelector(
    getProjectState, (state: ProjectState) => state.entities
);
export const getIds = createSelector(
    getProjectState, (state: ProjectState) => state.ids
);
export const getProjects = createSelector(
    getProjectState, (state: ProjectState) => state.projects
);
export const getAll = createSelector(
    getEntities, getIds, (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);
export const getTaskLists = createSelector(
    getTaskListState, (state: TaskListState) => state.taskLists
);

export function loggerBefore(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('environment.production ', environment.production);
        console.log('before action', action);
        console.log('before state', state);
        return reducer(state, action);
    };
}
export function loggerAfter(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('environment.production ', environment.production);
        console.log('after action', action);
        console.log('after state', state);
        return reducer(state, action);
    };
}
export function storeStateGuard(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state, action) {
        if (action.type === authActions.LOGOUT) {
            return reducer(undefined, action);
        }
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = environment.production
    ? [loggerBefore, storeFreeze, storeStateGuard] : [storeStateGuard];
