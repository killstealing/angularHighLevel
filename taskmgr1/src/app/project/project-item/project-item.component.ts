import { ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from './../../animations/card.anim';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import * as rootReducer from '../../reducers/reducers';
import * as taskListAction from '../../actions/task-list.action';
import * as projectAction from '../../actions/project.actions';
import * as rooterAction from '../../actions/router.actions';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';
import { Project } from '../../domain/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() inviteClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
  @Output() selected = new EventEmitter<void>();

  @HostBinding('@card') cardState = 'out';
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }
  constructor(private store$: Store<rootReducer.AppState>) { }
  ngOnInit() {
  }

  onInviteClick() {
    this.inviteClick.emit();
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }

  linkToTaskList() {
    this.store$.dispatch(new projectAction.SelectProjectAction(this.item));
    this.selected.emit();
  }
}
