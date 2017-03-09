import { Component, OnInit, OnDestroy,OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from './../shared/business-object/course';
import { CustomModal } from './../shared/component/custom-modal.component';
import { Student } from './../shared/business-object/student';
import { FacadeService } from './../shared/service/facade.service';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit, OnDestroy, OnChanges {
    courseId:number;
    private sub:any;
    studentList:Array<Student>;
    constructor(private route:ActivatedRoute,private facadeService: FacadeService) {
        this.studentList = new Array<Student>();
    }

    ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
        this.courseId = +params['id'];
        //console.log(this.courseId);
    });
    this.getStudentList();
    }
    ngOnDestroy(){

    }
    ngOnChanges(selectedStudent) {
        let index = this.studentList.indexOf(selectedStudent);
        this.studentList.splice(index, 1);
    }
    onSelectedStudentsChange(selectedStudent){
        /*
        this.selectedStudentList.length = 0;
        this.courseList.forEach(each=>{
            if(each.isSelected===true){
                this.selectedCourseList.push(each);
            }
        });
        this.selectedCourses = this.selectedCourseList.map(item=>{return item.title}).join(", ");
        */
    }

    getStudentList(){
        this.studentList = this.facadeService.getStudentList();
    }


}
