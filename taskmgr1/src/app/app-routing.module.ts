import { TaskModule } from './task/index';
import { ProjectModule } from './project/index';
import { AuthGuardService } from './services/auth.guard.service';
import { LoginComponent } from './login/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'projects', loadChildren: () => ProjectModule, pathMatch: 'full',
        canActivate: [AuthGuardService]
    },
    {
        path: 'tasklists/:id', loadChildren: () => TaskModule, pathMatch: 'full'
        , canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
