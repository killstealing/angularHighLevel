import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  day: string;
  @Output() navClickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.day = `day${new Date().getDay() + 1}`;
    console.log(this.day);
  }

  navClick() {
    this.navClickEvent.emit();
  }

}
