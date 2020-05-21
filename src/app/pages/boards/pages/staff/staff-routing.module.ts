import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseOverviewComponent} from "./pages/course-overview/course-overview.component";

const routes: Routes = [
  {
    path: 'overview',
    component: CourseOverviewComponent
  },

  {
    path: '',
    redirectTo: 'overview'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
