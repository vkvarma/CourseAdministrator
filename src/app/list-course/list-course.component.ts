import { Component, OnInit, OnChanges } from '@angular/core';
import { Course } from './../shared/business-object/course';
import { Student } from './../shared/business-object/student';
import { ViewCourseComponent } from './../view-course/view-course.component';
import { CustomModal } from './../shared/component/custom-modal.component';
import { FacadeService } from './../shared/service/facade.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit, OnChanges {
    courseList:Array<Course>;
    studentList:Array<Student>;
    selectedCourseList: Array<Course>;
    selectedCourses:string;

    constructor(private facadeService: FacadeService) {
    this.courseList = new Array<Course>();
    this.studentList = new Array<Student>();
    this.selectedCourseList = new Array<Course>();
    this.selectedCourses = "";
    }

    ngOnInit() {
        this.getCourseList();
        this.getStudentList();
    }
    ngOnChanges(selectedCourse) {
        let index = this.courseList.indexOf(selectedCourse);
        this.courseList.splice(index, 1);
    }
    onSelectedCoursesChange(selectedCourse){
        this.selectedCourseList.length = 0;
        this.courseList.forEach(each=>{
            if(each.isSelected===true){
                this.selectedCourseList.push(each);
            }
        });
        this.selectedCourses = this.selectedCourseList.map(item=>{return item.title}).join(", ");
    }
    getCourseList(){
        this.courseList = this.facadeService.getCourseList();
    }
    getStudentList(){
        this.studentList = this.facadeService.getStudentList(0);
    }
    updateChanges(isSuccess){
        let selectedStudentList:Array<Student> = new Array<Student>();
        /*
        this.selectedCourseList.forEach(course=>{
            this.studentList.forEach(student=>{
                if(student.isSelected){
                    //console.log(student.firstName + ' ' + student.lastName);
                    course.registeredStudents =course.registeredStudents + 1;
                }
            });
        });
        */
        this.studentList.forEach(student=>{
            if(student.isSelected){
                //console.log(student.firstName + ' ' + student.lastName);
                selectedStudentList.push(student);
            }
        });

        this.facadeService.updateCourse(this.selectedCourseList,selectedStudentList);
        this.facadeService.updateStudentCourses();
        this.resetStudentList();
        this.resetCourseList();
    }
    resetStudentList(){
        this.studentList.forEach(student=>student.isSelected=false);
    }
    resetCourseList(){
        this.courseList.forEach(course=>course.isSelected=false);
    }

}
