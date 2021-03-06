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
import {AddAnnoucementComponent} from "./pages/add-annoucement/add-annoucement.component";
import {AssignmentsOverviewComponent} from "./pages/assignments-overview/assignments-overview.component";
import {AddAssignmentsComponent} from "./pages/add-assignments/add-assignments.component";
import {EditAssignmentsComponent} from "./pages/edit-assignments/edit-assignments.component";
import {ShowSubmissionsComponent} from "./pages/show-submissions/show-submissions.component";

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
    path: 'manage-subjects/:courseId/subjects/:subjectId/assignments-overview',
    component: AssignmentsOverviewComponent
  },
  {
    path: 'manage-subjects/:courseId/subjects/:subjectId/assignments-overview/add',
    component: AddAssignmentsComponent
  },
  {
    path: 'manage-subjects/:courseId/subjects/:subjectId/assignments-overview/edit/:assignmentId',
    component: EditAssignmentsComponent
  },
  {
    path: 'manage-subjects/:courseId/subjects/:subjectId/assignments-overview/show/:assignmentId',
    component: ShowSubmissionsComponent
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
    path: 'announcements/:courseId',
    component: AddAnnoucementComponent
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
