import { listAnimation } from './../../animations/list.anim';
import { ConfirmComponent } from './../../common/confirm/confirm.component';
import { ConstClass } from './../../constData/constData.model';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from './../../service/project.service';
import { NewProjectComponent } from './../new-project/new-project.component';
import { Component, OnInit, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Project } from '../../domain/project.model';
import { slideToRight } from '../../animations/route.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight, listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  items: Project[];
  @HostBinding('@routeAnim') state;
  constructor(public dialog: MatDialog, public projectService: ProjectService,
    private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.projectService.getProjects().subscribe(list => {
      this.items = list;
      this.cd.markForCheck();
    });
  }

  newProject(event: Event) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: ConstClass.NewProjectTitle } });
    dialogRef.afterClosed().take(1).subscribe(list => {
      console.log(list === '');
      if ('' !== list && null != list) {
        console.log('aaaaaaa');
        this.items = list;
        // this.listAnim = this.items.length;
        this.cd.markForCheck();
      }
    });
  }

  launchEditDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: ConstClass.EditProjectTitle,
        project: project
      }
    });
    dialogRef.afterClosed().subscribe(list => {
      if ('' !== list && null != list) {
        this.items = list;
        this.cd.markForCheck();
      }
    });
  }

  launchDelDialog(productId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent,
      { data: { title: ConstClass.DelProjectTitle } });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.projectService.doDel(productId).subscribe(products => {
          this.items = products;
          this.cd.markForCheck();
        });
      }
    });
  }

}
