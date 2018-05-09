import { getProjectState } from './../../reducers/reducers';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Project } from './../../domain/project.model';
import { ProjectService } from './../../services/project.service';
import { listAnimation } from './../../animations/list.anim';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { InviteComponent } from './../invite/invite.component';
import { NewProjectComponent } from './../new-project/new-project.component';
import { Component, OnInit, OnDestroy, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { slideToRight } from '../../animations/router.anim';
import * as _ from 'lodash';
import * as rootReducer from '../../reducers/reducers';
import * as projectActions from '../../actions/project.actions';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight, listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnim') state;
  sub: Subscription;

  listAnim$: Observable<number>;

  projects$: Observable<Project[]>;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef,
    private store$: Store<rootReducer.AppState>,
    private projectService: ProjectService) {
    this.store$.dispatch(new projectActions.LoadProjectsAction(null));
    this.projects$ = this.store$.pipe(select(rootReducer.getProjects));
    this.listAnim$ = this.projects$.map(p => p.length);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent,
      { data: { thumbnails: this.getThumbnails(), img: selectedImg } }
    );
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .subscribe(project => {
        this.store$.dispatch(new projectActions.AddProjectAction(project));
      });
  }

  launchInviteDialog(project: Project) {
    const dialogRef = this.dialog.open(InviteComponent, { data: { members: ['1'] } });
  }

  launchEditDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent,
      { data: { thumbnails: this.getThumbnails(), project: project } }
    );
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) }))
      .subscribe(v => {
        this.store$.dispatch(new projectActions.UpdateProjectAction(v));
      });
    // .switchMap(v => this.projectService.update(v))
    // .subscribe(p1 => {
    //   const index = this.projects.map(p => p.id).indexOf(p1.id);
    //   this.projects = [...this.projects.slice(0, index), p1,
    //   ...this.projects.slice(index + 1)];
    //   this.cd.markForCheck();
    // });
  }

  launchDeleteDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目：',
        content: '您确认删除该项目吗？'
      }
    });
    dialogRef.afterClosed().take(1).filter(n => n)
      .subscribe(_t => {
        this.store$.dispatch(new projectActions.DeleteProjectAction(project));
      });
    // .switchMap(_t => this.projectService.del(project))
    // .subscribe(prj => {
    //   this.projects = this.projects.filter(p => p.id !== prj.id);
    //   this.cd.markForCheck();
    // });
  }

  selectProject(project) {
    console.log('收到');
    // this.store$.dispatch(new projectActions.SelectProjectAction(project));
  }

  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    console.log(img);
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
