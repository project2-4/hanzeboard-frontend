import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseOverviewComponent} from "./pages/course-overview/course-overview.component";
import {AddCourseComponent} from "./pages/add-course/add-course.component";
import {ImportGradesComponent} from "./pages/import-grades/import-grades.component";
import {ReportSicknessComponent} from "./pages/report-sickness/report-sickness.component";

const routes: Routes = [
  {
    path: 'courses/overview',
    component: CourseOverviewComponent
  },
  {
    path: 'courses/create',
    component: AddCourseComponent
  },

  {
    path: 'import-grades',
    component: ImportGradesComponent
  },

  {
    path: 'report-sickness',
    component: ReportSicknessComponent,
  },

  {
    path: '',
    redirectTo: 'courses/overview'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
