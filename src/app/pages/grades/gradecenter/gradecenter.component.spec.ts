import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradecenterComponent } from './gradecenter.component';

describe('GradecenterComponent', () => {
  let component: GradecenterComponent;
  let fixture: ComponentFixture<GradecenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradecenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradecenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
