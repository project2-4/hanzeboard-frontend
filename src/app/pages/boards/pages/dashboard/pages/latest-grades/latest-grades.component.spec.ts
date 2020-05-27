import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestGradesComponent } from './latest-grades.component';

describe('LatestGradesComponent', () => {
  let component: LatestGradesComponent;
  let fixture: ComponentFixture<LatestGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
