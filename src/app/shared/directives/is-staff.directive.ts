import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';

@Directive({
  selector: '[appIsStaff]'
})
export class IsStaffDirective implements OnInit, OnDestroy {

  @Input() appIsStaff: string;
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    const permission = this.authorizationService.getProfileType();
    if (permission === this.appIsStaff) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {
      this.isVisible = false;
      this.viewContainerRef.clear();
    }
  }

  ngOnDestroy() {}

}
