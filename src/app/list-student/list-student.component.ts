import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
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
    courseId: number;
    private sub: any;
    studentList: Array<Student>;
    courseList: Array<Course>;
    selectedStudentList: Array<Student>;
    studentListType: number;
    studentsCount: number;
    selectedStudents: string;
    course: Course;
    constructor(private route: ActivatedRoute, private facadeService: FacadeService) {
        this.studentList = new Array<Student>();
        this.courseList = new Array<Course>();
        this.studentListType = 1;
        this.studentsCount = 0;
        this.course = new Course();
        this.selectedStudentList = new Array<Student>();
        this.selectedStudents = "";
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.courseId = +params['id'];
        });
        if (this.courseId > 0) {
            this.facadeService.setStudentListType(2);
            this.studentListType = 2;
            this.course = this.facadeService.getCourseById(this.courseId);
            this.courseList = Object.assign([], this.facadeService.getCourseList());
            this.removeSelectedCourse(this.course);
        }
        else {
            this.facadeService.setStudentListType(1);
            this.studentListType = 1;
        }
        this.getStudentList(this.courseId);
    }
    ngOnDestroy() {

    }
    ngOnChanges(selectedStudent) {
        let index = this.studentList.indexOf(selectedStudent);
        this.studentList.splice(index, 1);
    }
    onSelectedStudentsChange(selectedStudent) {
        this.selectedStudentList.length = 0;
        this.studentList.forEach(each => {
            if (each.isSelected === true) {
                this.selectedStudentList.push(each);
            }
        });
        this.selectedStudents = this.selectedStudentList.map
            (item => { return item.firstName + ' ' + item.lastName }).join(", ");
    }

    getStudentList(courseId: number) {
        this.studentList = this.facadeService.getStudentList(courseId);
        if (this.studentList) {
            this.studentsCount = this.studentList.length;
        }
    }

    removeSelectedCourse(course: Course) {
        let index = this.courseList.indexOf(course);
        this.courseList.splice(index, 1);
    }
    updateChanges(isSuccess) {
        this.courseList.forEach(course => {
            if (course.isSelected) {
                //console.log(this.selectedStudentList);
                this.facadeService.assignCoursToStudents(course, this.selectedStudentList);
            }
        });

        this.selectedStudentList.forEach(student => {
            this.facadeService.removeStudentFromRegisterStudent(this.course, student);
        });
        this.studentsCount = this.studentList.length;
        this.facadeService.updateStudentCourses();
        this.resetCourseList();
        this.resetStudentList();
    }
    resetStudentList() {
        this.studentList.forEach(student => student.isSelected = false);
        this.selectedStudentList.forEach(student => student.isSelected = false);
    }
    resetCourseList() {
        this.courseList.forEach(course => course.isSelected = false);
    }
}
