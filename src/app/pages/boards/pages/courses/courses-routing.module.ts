import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseDetailsComponent} from "./pages/course-details/course-details";

const routes: Routes = [
  {
    path: ':id',
    component: CourseDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
