import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Student } from './../shared/business-object/student';
import { Course } from './../shared/business-object/course';
import { StudentCourses } from './../shared/business-object/student-course';
import { RegisterStudent } from './../shared/business-object/register-student';
import { FacadeService } from './../shared/service/facade.service';


@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
    student:Student;
    editStudenId:number;
    studentCourse: StudentCourses;
    studentCourseList: Array<Course>;
    registerStudent: RegisterStudent;
    headerText: string;
    private sub:any;

    constructor(private router:Router, private activatedRoute:ActivatedRoute, private facadeService: FacadeService) {
        this.student = new Student();
        this.editStudenId = 0;
        this.studentCourse = new StudentCourses();
        this.studentCourseList = new Array<Course>();
        this.headerText = "Add Student";

    }
    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(prams=>{
            this.editStudenId = +prams['id'];
        });
        if(this.editStudenId>0){
            this.headerText = "Edit Student";
            this.getStudentById(this.editStudenId);
            this.getAllCourseByStudentId(this.editStudenId);
        }
        else{
            this.student = new Student();
        }
    }

    registerNewStudent(form:NgForm){
      this.student.firstName = form.value["student.firstName"];
      this.student.lastName = form.value["student.lastName"];
      this.student.schoolInYear = form.value["student.schoolInYear"];
      this.student.isSelected = false;
      if(this.editStudenId>0){
          this.facadeService.updateIndvidualStudent(this.student);

      }
      else{
          this.facadeService.setStudentMaxId();
          this.student.id =this.facadeService.getStudentMaxId();
          this.facadeService.addStudent(this.student);
      }
        this.router.navigate(['/students/0']);
    }
    getStudentById(id: number){
        //console.log(id);
        this.student = this.facadeService.getStudentById(id);
        //console.log(this.course);
    }
    reset(){
        this.router.navigate(['/students/0']);
    }
    getAllCourseByStudentId(id: number) {
        this.studentCourse = this.facadeService.getAllCourseByStudentId(id);
        if(this.studentCourse && this.studentCourse.course){
            this.studentCourseList = this.studentCourse.course;
        }
    }
    getAllStudentsByCourseId(courseId: number): RegisterStudent{
        return this.facadeService.getAllStudentsByCourseId(courseId);
    }
    removeCourse(course:Course){
        let index = this.studentCourseList.indexOf(course);
        this.studentCourseList.splice(index,1);
        this.updateCourseInfo(course);
    }
    updateCourseInfo(course:Course) {
        this.registerStudent = this.getAllStudentsByCourseId(course.id);
        let index = this.registerStudent.student.indexOf(this.student);
        this.registerStudent.student.splice(index,1);
        let actualCourse = this.facadeService.getCourseById(course.id);
        actualCourse.registeredStudents = actualCourse.registeredStudents - 1;
    }

}
