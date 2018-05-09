import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  @Output() quickTask = new EventEmitter();
  desc: string;
  constructor() { }
  ngOnInit() {
  }
  onSubmit({ value, valid }, event: Event) {
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }
  @HostListener('keyup.enter')
  sendQuickTask() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
      return;
    }
    this.quickTask.emit(this.desc);
    this.desc = '';
  }

}
