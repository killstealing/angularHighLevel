import { SharedModule } from './../shared/shared.module';
import { ProjectRoutingModule } from './project-route.module';
import { NgModule } from '@angular/core';
import { InviteComponent } from './invite/invite.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [InviteComponent, NewProjectComponent, ProjectItemComponent, ProjectListComponent],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule { }
