import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() clickMenu = new EventEmitter();
  @Output() toggleThemeEvent = new EventEmitter<boolean>();

  constructor() { }

  // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  //   iconRegistry.addSvgIcon('gifts', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/1.svg'));
  // }

  ngOnInit() {
  }

  toggleSidenav() {
    this.clickMenu.emit();
  }

  toggleTheme(checked: boolean) {
    this.toggleThemeEvent.emit(checked);
  }
}
