import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  show = false;
  timer;
  constructor() {
    LoadingService.loading = this;
  }

  ngOnInit() {
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

}
