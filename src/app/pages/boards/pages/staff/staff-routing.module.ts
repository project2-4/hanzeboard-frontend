import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CourseOverviewComponent} from "./pages/course-overview/course-overview.component";
import {AddCourseComponent} from "./pages/add-course/add-course.component";
import {ImportGradesComponent} from "./pages/import-grades/import-grades.component";
import {ManageSubjectsComponent} from "./pages/manage-subjects/manage-subjects.component";
import {AddSubjectComponent} from "./pages/add-subject/add-subject.component";
import {EditSubjectComponent} from "./pages/edit-subject/edit-subject.component";
import {EditCourseComponent} from "./pages/edit-course/edit-course.component";
import {ReportAbsentComponent} from "./pages/report-absent/report-absent.component";
import {UserManagementComponent} from "./pages/user-management/user-management.component";
import {AddUserComponent} from "./pages/add-user/add-user.component";
import {EditUserComponent} from "./pages/edit-user/edit-user.component";

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
    path: 'courses/:courseId/edit',
    component: EditCourseComponent
  },
  {
    path: 'manage-subjects/:courseId',
    component: ManageSubjectsComponent
  },
  {
    path: 'manage-subjects/:courseId/subjects/add',
    component: AddSubjectComponent
  },
  {
    path: 'manage-subjects/:courseId/subjects/edit/:subjectId',
    component: EditSubjectComponent
  },
  {
    path: 'import-grades',
    component: ImportGradesComponent
  },
  {
    path: 'report-absent',
    component: ReportAbsentComponent,
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: 'user-management/:type/add',
    component: AddUserComponent
  },
  {
    path: 'user-management/:type/edit/:userId',
    component: EditUserComponent
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
