import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseOverviewComponent} from "./pages/course-overview/course-overview.component";
import {AddCourseComponent} from "./pages/add-course/add-course.component";

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
    path: '',
    redirectTo: 'courses/overview'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
