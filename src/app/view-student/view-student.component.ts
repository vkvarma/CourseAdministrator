import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Student } from './../shared/business-object/student';
import { StudentCourses } from './../shared/business-object/student-course';
import { FacadeService } from './../shared/service/facade.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
    @Input() student: Student;
    @Output() studentChange: EventEmitter<Student>;
    @Output() selectedStudentsChange : EventEmitter<Student>;
    studentCourse: StudentCourses;
    studentCourseFormattedString:string;

    constructor(private facadeService: FacadeService) {
        this.studentChange = new EventEmitter<Student>();
        this.selectedStudentsChange = new EventEmitter<Student>();
        this.studentCourse = new StudentCourses();
        this.studentCourseFormattedString = "";
    }

    ngOnInit() {
        this.getAllCourseByStudentId(this.student.id);
    }

    removeStudent(){
     this.studentChange.emit(this.student);
    }
    isChecked(isValueChecked){
        this.student.isSelected = isValueChecked;
        //console.log(this.course.isSelected);
        this.selectedStudentsChange.emit(this.student);
    }
    getAllCourseByStudentId(id:number) {
        this.studentCourse = this.facadeService.getAllCourseByStudentId(id);
        if(this.studentCourse && this.studentCourse.course){
            this.studentCourseFormattedString = this.studentCourse.course.map(c=>c.title).join(', ');
        }
    }

}
