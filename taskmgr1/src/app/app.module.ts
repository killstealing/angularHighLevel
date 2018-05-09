import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ArticleComponent } from './redux/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LoginModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
