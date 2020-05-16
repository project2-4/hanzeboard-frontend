import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthorizationService} from '../services/authorization/authorization.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  @Input() appHasRole: string;
  stop$ = new Subject();
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authorizationService: AuthorizationService
  ) {}

  // Inspiration: https://blog.strongbrew.io/display-a-component-based-on-role/
  ngOnInit() {
    this.authorizationService.getRoles()
      .subscribe(roles => {
        if (!roles) {
          this.viewContainerRef.clear();
        }
        if (roles.includes(this.appHasRole)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
