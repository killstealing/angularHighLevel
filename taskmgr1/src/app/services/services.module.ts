import { AuthGuardService } from './auth.guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TaskService } from './task.service';
import { TaskListService } from './task-list.service';
import { ProjectService } from './project.service';
import { QuoteService } from './quote.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        UserService,
        AuthService,
        AuthGuardService
      ]
    };
  }
}
