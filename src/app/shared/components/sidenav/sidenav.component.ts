import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SideBarService} from '../../services/side-bar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav')
  private sidenav: MatSidenav;
  private subscription;

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

  constructor(private sideBarService: SideBarService) { }

  ngOnInit() {
    if (window.innerWidth <= 992) {
      this.options.top = 75;
      this.options.mode = 'over';
      this.options.opened = false;
    }

    this.subscription = this.sideBarService.toggled.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
