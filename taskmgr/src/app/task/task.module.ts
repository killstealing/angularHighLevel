import { TaskRoutingModule } from './task-route.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';
import { NgModelTestComponent } from './ng-model-test/ng-model-test.component';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [TaskHomeComponent, TaskListComponent, TaskItemComponent,
    TaskHeaderComponent, NewTaskComponent, CopyTaskComponent, NewTaskListComponent, QuickTaskComponent, NgModelTestComponent],
  entryComponents: [NewTaskComponent, CopyTaskComponent, NewTaskListComponent]
})
export class TaskModule { }
