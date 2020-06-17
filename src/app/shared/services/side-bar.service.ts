import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  @Output() toggled: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    if (window.innerWidth <= 992) {
      this.toggled.emit(true);
    }
  }
}
