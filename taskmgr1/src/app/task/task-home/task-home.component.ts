import { Store } from '@ngrx/store';
import { NewTaskListComponent } from './../new-task-list/new-task-list.component';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { NewTaskComponent } from './../new-task/new-task.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { slideToRight } from '../../animations/router.anim';
import * as rootReducer from '../../reducers/reducers';
import * as projectReducer from '../../reducers/project.reducer';
import * as projectAction from '../../actions/project.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TaskList } from '../../domain/index';
import * as taskListAction from '../../actions/task-list.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  list$: Observable<TaskList[]>;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef,
    private store$: Store<rootReducer.AppState>,
    private router: ActivatedRoute) {
    this.projectId$ = this.router.paramMap.map(p => p.get('id'));
    this.list$ = this.store$.select(rootReducer.getTaskLists);
    // this.projectId$ = this.router.paramMap.pipe(map(p => <string>p.get('id')));
    // this.projectId$ = this.store$.select(rootReducer.getSelectedId);
  }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: '新建任务'
      }
    });
  }

  launchCopyTaskDialog() {
    // const dialogRef = this.dialog.open(CopyTaskComponent, {
    //   data: {
    //     lists: this.lists
    //   }
    // });
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务',
        task: task
      }
    });
  }

  launchConfirmDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除列表:',
        content: '您确定删除该列表吗？'
      }
    });
    dialogRef.afterClosed().take(1).filter(p => p)
      .subscribe(result => this.store$.dispatch(new taskListAction
        .DeleteTaskListAction(list)));
  }

  launchEditTaskListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '修改任务列表名称:', list: list
      }
    });
    dialogRef.afterClosed().take(1).subscribe(result =>
      this.store$.dispatch(new taskListAction
        .UpdateTaskListAction({ ...result, id: list.id })));
  }

  launchNewListDialog(ev: Event) {
    ev.preventDefault();
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '新建列表:'
      }
    });
    dialogRef.afterClosed().take(1)
      .withLatestFrom(this.projectId$, (val, projectId) => ({ ...val, projectId: projectId }))
      .filter(p => p).subscribe(result => this.store$
        .dispatch(new taskListAction.AddTaskListAction(result)));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list' + JSON.stringify(srcData.data));
        console.log('handling list' + JSON.stringify(list));
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(event) {
    console.log('event', JSON.stringify(event));
  }

}
