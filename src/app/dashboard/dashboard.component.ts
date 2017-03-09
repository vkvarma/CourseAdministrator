import { Component, OnInit } from '@angular/core';
import { Course } from './../shared/business-object/course';
import { FacadeService } from './../shared/service/facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    courseList:Array<Course>;
    constructor(private facadeService:FacadeService) {
    }

    ngOnInit() {
        this.getCourseList();
    }
    getCourseList(){
        this.courseList = this.facadeService.getCourseList();
    }


}
