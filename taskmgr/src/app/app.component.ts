import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService } from './service/settings.service';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square', [
      state('green', style({
        'background-color': 'green', 'height': '50px', 'transform': 'translateY(-100%)'
      })),
      state('red', style({
        'background-color': 'red', 'height': '50px', 'transform': 'translateY(100%)'
      })),
      transition('green=>red', animate('.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
      transition('red=>green', animate('.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
    ])
  ]
})
export class AppComponent {
  title = 'app';
  theme: boolean;
  squareState = 'green';
  constructor(private oc: OverlayContainer, private settings: SettingsService) { }
  switchTheme(checked: boolean) {
    console.log('checked', checked);
    this.theme = checked;
    if (checked) {
      this.oc.getContainerElement().classList.add(this.settings.theme);
    } else {
      this.oc.getContainerElement().classList.remove(this.settings.theme);
    }
  }

  onClick() {
    if (this.squareState === '' || this.squareState === 'red') {
      this.squareState = 'green';
    } else {
      this.squareState = 'red';
    }
  }
}
