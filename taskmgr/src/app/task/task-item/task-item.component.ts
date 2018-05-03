import { itemAnim } from './../../animations/item.anim';
import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { Task } from '../../domain/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ]
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() updateTaskEvent = new EventEmitter();
  widerPriority = 'out';
  // onMouseEnter() {
  //   this.widerPriority = 'hover';
  // }
  // onMouseLeave() {
  //   this.widerPriority = 'out';
  // }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(card) { this.widerPriority = 'hover'; }
  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(card: HTMLElement) { this.widerPriority = 'out'; }

  constructor() { }

  ngOnInit() {
  }

  updateTask() {
    this.updateTaskEvent.emit(this.task);
  }

}
