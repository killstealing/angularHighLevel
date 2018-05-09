import { QuoteService } from './../../services/quote.service';
import { FAVORITE_ARTICLES } from './../../domain/article.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../domain/article.model';
import * as articleActions from '../../actions/article.actions';
import * as rootReducer from '../../reducers/reducers';

// import * as quote1Actions from '../../actions/quote1.actions';
// import * as quote1Reducer from '../../reducers/quote1.reducer';
// import { Quote1 } from '../../domain/quote1.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: Observable<Article[]>;

  constructor(private store$: Store<rootReducer.AppState>,
    private service$: QuoteService) {
    this.articles = this.store$.select(rootReducer.getArticles);
    // this.quote$ = this.store$.select(quote1Reducer.getQuote1);
  }

  ngOnInit() {
  }

  showJava() {
    this.store$.dispatch(new articleActions.JavaArticlesAction());
  }
  showAngualr() {
    this.store$.dispatch(new articleActions.AngularArticlesAction());
  }
  showFavorite() {
    this.store$.dispatch(new articleActions.FavoriteArticlesAction(FAVORITE_ARTICLES));
  }

  callQuote() {
    this.service$.getQuote().subscribe(q => {
      // this.store$.dispatch(new quote1Actions.LoadSuccessAction(q));
    });
  }
}
