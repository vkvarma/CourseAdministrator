import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Course } from './../shared/business-object/course';
import { Student } from './../shared/business-object/student';
import { RegisterStudent } from './../shared/business-object/register-student';
import { FacadeService } from './../shared/service/facade.service';


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
    course:Course;
    editCourseId:number;
    registerStudent: RegisterStudent;
    headerText:string;
    private sub:any;

    constructor(private router:Router, private activatedRoute:ActivatedRoute, private facadeService: FacadeService) {
        this.course = new Course();
        this.editCourseId = 0;
        this.registerStudent = new RegisterStudent();
        this.headerText = "Add Course";
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params=>{
            this.editCourseId = +params['id'];
            //console.log(this.editCourseId);
        });
        if(this.editCourseId>0){
            this.headerText = "Edit Course";
            this.getCourseById(this.editCourseId);
            this.registerStudent = this.getAllStudentsByCourseId(this.editCourseId);
        }
        else{
            this.course = new Course();
        }
    }
    registerCourse(form: NgForm){

        this.course.title = form.value["course.title"];
        this.course.description = form.value["course.description"];
        this.course.maxNoOfStudents = form.value["course.maxNoOfStudents"];
        this.course.isSelected = false;

        //console.log(this.course);
        if(this.editCourseId>0){
            this.facadeService.updateIndvidualCourse(this.course);
        }
        else{
            this.facadeService.setCourseMaxId();
            this.course.id =this.facadeService.getCourseMaxId();
            this.course.registeredStudents = 0;
            this.facadeService.addCourse(this.course);
        }
        this.router.navigate(['/courses']);
    }
    getCourseById(id: number){
        //console.log(id);
        this.course = this.facadeService.getCourseById(id);
        //console.log(this.course);
    }
    reset(){
        this.router.navigate(['/courses']);
    }
    getAllStudentsByCourseId(courseId: number): RegisterStudent{
        return this.facadeService.getAllStudentsByCourseId(courseId);
    }
    removeStudent(student:Student){
        this.course.registeredStudents = this.course.registeredStudents - 1;
        let index = this.registerStudent.student.indexOf(student);
        this.registerStudent.student.splice(index,1);
    }


}
