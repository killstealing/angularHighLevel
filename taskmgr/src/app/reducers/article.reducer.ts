import { JAVA_ARTICLES, FAVORITE_ARTICLES, ANGULAR_ARTICLES } from './../domain/article.model';
import { Article } from '../domain/article.model';
import * as articleActions from '../actions/article.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface ArticleState {
    articles: Article[];
}

const initialState: ArticleState = {
    articles: JAVA_ARTICLES
};

export function reducer(state = initialState, action: articleActions.Actions): ArticleState {
    switch (action.type) {
        case articleActions.ClassActionTypes.JAVA: {
            // return { ...state, articles: JAVA_ARTICLES };
            return { articles: JAVA_ARTICLES };
        }
        case articleActions.ClassActionTypes.ANGULAR: {
            // return { ...state, articles: ANGULAR_ARTICLES };
            return { articles: ANGULAR_ARTICLES };
        }
        default : {
            // return { ...state, articles: FAVORITE_ARTICLES };
            return { articles: FAVORITE_ARTICLES };
        }
    }
}

export const getArticleState = createFeatureSelector<ArticleState>('articleState');

export const getArticles = createSelector(
    getArticleState, (state: ArticleState) => state.articles
);
