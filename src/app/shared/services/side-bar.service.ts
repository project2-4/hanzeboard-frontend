import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  @Output() toggled: EventEmitter<string> = new EventEmitter();

  toggle() {
    if (window.innerWidth <= 992) {
      this.toggled.emit('toggle');
    }
  }

  close() {
    if (window.innerWidth <= 992) {
      this.toggled.emit('close');
    }
  }
}
