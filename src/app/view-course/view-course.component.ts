import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from './../shared/business-object/course';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
    @Input() course: Course;
    @Output() courseChange: EventEmitter<Course>;
    @Output() selectedCoursesChange : EventEmitter<Course>;

    constructor() {
        this.courseChange = new EventEmitter<Course>();
        this.selectedCoursesChange = new EventEmitter<Course>();
    }

    ngOnInit() {
    }

    removeCourse(){
        this.courseChange.emit(this.course);
    }
    isChecked(isValueChecked){
        this.course.isSelected = isValueChecked;
        //console.log(this.course.isSelected);
        this.selectedCoursesChange.emit(this.course);
    }

}
