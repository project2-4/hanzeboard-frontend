import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheroverviewComponent } from './teacheroverview.component';

describe('TeacheroverviewComponent', () => {
  let component: TeacheroverviewComponent;
  let fixture: ComponentFixture<TeacheroverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacheroverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacheroverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
