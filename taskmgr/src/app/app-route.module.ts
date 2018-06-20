import { ArticleComponent } from './redux/article/article.component';
import { TaskHomeComponent } from './task/task-home/task-home.component';
import { Page404Component } from './page404/page404.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { NewWindowComponent } from './container/new-window/new-window.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'projectList', component: ProjectListComponent },
    { path: 'taskHome', component: TaskHomeComponent },
    { path: 'article', component: ArticleComponent },
    { path: 'newWindow', component: NewWindowComponent }
    // { path: '**', component: Page404Component }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
