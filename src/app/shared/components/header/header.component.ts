import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';
import {SideBarService} from '../../services/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  deferredPrompt: any;
  showA2HSButton = false;

  constructor(private authService: AuthenticationService,
              public router: Router,
              private sideBarService: SideBarService) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.sideBarService.toggle();
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showA2HSButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showA2HSButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  sidebarToggle() {
    this.sideBarService.toggle();
  }
}
