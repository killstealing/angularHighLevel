import { environment } from './../../environments/environment';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as articleReducer from './article.reducer';
import { ArticleState } from './article.reducer';

export interface AppState {
    articleState: ArticleState;
}

export const reducers: ActionReducerMap<AppState> = {
    articleState: articleReducer.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
