import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CourseService } from './shared/service/course.service';
import { StudentService } from './shared/service/student.service';
import { FacadeService } from './shared/service/facade.service';

import { routes } from './app.router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { HeaderComponent } from './header/header.component';
import { CustomModal } from './shared/component/custom-modal.component';
import { ModalTriggerDirective } from './shared/directive/modal-trigger.directive';
import { HighLightBorderDirective } from './shared/directive/highlight-border.directive';
import { JQUERY_TOKEN } from './shared/service/jQuery.service';

//export declare let  jQuery: Object;


// return the global instance of jquery
export function jQueryFactory() {
    return window['jQuery'];
}


@NgModule({
  declarations: [
    AppComponent,
    NewCourseComponent,
    NewStudentComponent,
    ViewCourseComponent,
    ViewStudentComponent,
    ListStudentComponent,
    ListCourseComponent,
    DashboardComponent,
    HeaderComponent,
    CustomModal,
    ModalTriggerDirective,
    HighLightBorderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
      {provide: JQUERY_TOKEN, useFactory: jQueryFactory},
      CourseService,
      FacadeService,
      StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
