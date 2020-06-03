import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public options = {
    bottom: 0,
    fixed: false,
    top: 80,
    mode: 'side',
    opened: true
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 992 && this.options.mode !== 'over') {
      this.options.top = 75;
      this.options.mode = 'over';
      this.options.opened = false;
    }

    if (event.target.innerWidth > 992 && this.options.mode !== 'side') {
      this.options.mode = 'side';
      this.options.opened = true;
    }
  }

  constructor() { }

  ngOnInit() {
    if (window.innerWidth <= 992) {
      this.options.top = 75;
      this.options.mode = 'over';
      this.options.opened = false;
    }
  }

}
