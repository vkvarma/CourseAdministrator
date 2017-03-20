import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { ListCourseComponent } from './list-course/list-course.component';

export const router: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addCourse/:id', component: NewCourseComponent },
    { path: 'addStudent/:id', component: NewStudentComponent },
    { path: 'courses', component: ListCourseComponent },
    { path: 'students/:id', component: ListStudentComponent }
];
export const routes: ModuleWithProviders = RouterModule.forRoot(router);


