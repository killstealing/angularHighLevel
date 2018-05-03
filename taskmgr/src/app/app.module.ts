import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { AppRoutingModule } from './app-route.module';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    LoginModule,
    AppRoutingModule,
    ProjectModule,
    TaskModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
