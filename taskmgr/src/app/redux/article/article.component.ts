import { FAVORITE_ARTICLES } from './../../domain/article.model';
import { ArticleState, getArticles } from './../../reducers/article.reducer';
import * as articleReducer from './../../reducers/article.reducer';
import * as articleActions from './../../actions/article.action';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../domain/article.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Observable<Article[]>;
  constructor(private store: Store<ArticleState>, private router: Router) {
    this.articles = this.store.select(articleReducer.getArticles);
  }

  ngOnInit() {
  }

  showJava() {
    this.store.dispatch(new articleActions.JavaArticleAction);
  }
  showAngular() {
    this.store.dispatch(new articleActions.AngularArticleAction);
  }
  showFavorite() {
    this.store.dispatch(new articleActions.FavoriteArticleAction(FAVORITE_ARTICLES));
  }

  openNewWindow() {
    // this.router.navigate(['/newWindow', { data: 'aaa' }]);
    window.open('/newWindow', '_blank');
  }

}
