import {
  Component,
  OnInit, Input,
  Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  @Input()
  header = '';
  @Output()
  newTask = new EventEmitter<void>();
  @Output()
  moveAll = new EventEmitter<void>();
  @Output()
  deleteClick = new EventEmitter<void>();
  @Output()
  editClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTask.emit();
  }

  onMoveAllClick() {
    this.moveAll.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }

  onEditClick() {
    this.editClick.emit();
  }

}
