import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseTestComponent} from "./pages/course-test/course-test.component";

const routes: Routes = [
  {
    path: 'test',
    component: CourseTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
