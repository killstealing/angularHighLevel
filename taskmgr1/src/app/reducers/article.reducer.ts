import { JAVA_ARTICLES, ANGULAR_ARTICLES, Article } from './../domain/article.model';
import * as fromActions from '../actions/article.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ArticleState {
    articles: Article[];
}

export const initialState: ArticleState = {
    articles: JAVA_ARTICLES
};

export function reducer(state = initialState, action: fromActions.All): ArticleState {
    switch (action.type) {
        case fromActions.JAVA: {
            return {
                articles: JAVA_ARTICLES
            };
        }
        case fromActions.ANGULAR: {
            return {
                articles: ANGULAR_ARTICLES
            };
        }
        case fromActions.MY_ARTICLES: {
            return {
                articles: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
