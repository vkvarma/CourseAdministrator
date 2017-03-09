import { Injectable } from '@angular/core';
import { Course } from './../business-object/course';
import { Student } from './../business-object/student';
import { RegisterStudent } from './../business-object/register-student';
import { StudentCourses } from './../business-object/student-course';

@Injectable()
export class CourseService {
    static courseList:Array<Course>;
    static maxCourseId:number;
    static registerStudentList: Array<RegisterStudent>;
    static studentCourseList: Array<StudentCourses>;

    constructor() {
        CourseService.courseList = new Array<Course>();
        CourseService.registerStudentList = new Array<RegisterStudent>();
        CourseService.maxCourseId = 6;
    }

    getCourseList() : Array<Course> {
        if(CourseService.courseList.length>0) return CourseService.courseList;

        CourseService.courseList.push({
            id:1, title: 'Software Engineering',registeredStudents:0,maxNoOfStudents:10, isSelected:false,
            description: 'software enginnering descripion'});
        CourseService.courseList.push({
            id:2, title: 'Project Managment', registeredStudents:0,maxNoOfStudents:10,isSelected:false,
            description: 'Project Managment descripion'});
        CourseService.courseList.push({
            id:3, title: 'Internet of Things',registeredStudents:0,maxNoOfStudents:15,isSelected:false,
            description: 'Internet of Things descripion'});
        CourseService.courseList.push({
            id:4, title: 'Operation Research',registeredStudents:0,maxNoOfStudents:20,isSelected:false,
            description: 'Operation Research descripion'});
        CourseService.courseList.push({
            id:5, title: 'Artificial Intelligence',registeredStudents:0,maxNoOfStudents:15,isSelected:false,
            description: 'Artificial Intelligence descripion'});
        CourseService.courseList.push({
            id:6, title: 'Programming Best Practices',registeredStudents:0,maxNoOfStudents:25,isSelected:false,
            description: 'Programming Best Practices descripion'});
        return CourseService.courseList;
    }
    updateCourse(selectedCourses:Array<Course>, selectedStudents:Array<Student> ){
        let count=0;

        selectedCourses.forEach(course=> {
            let arrStudent:Array<Student> = new Array<Student>();
            let currentCourse = CourseService.registerStudentList.find(o=>o.course.id=== course.id);
            if(!currentCourse){
                CourseService.registerStudentList.push({course:course, student:arrStudent});
                currentCourse = CourseService.registerStudentList.find(o=>o.course.id=== course.id);
            }
            arrStudent = currentCourse.student;
            selectedStudents.forEach(student=> {
                if(!arrStudent.find(o=>o.id===student.id)) {
                    arrStudent.push(student);
                    count = course.registeredStudents + 1;
                    this.updateActualCourse(course, count);

                }
            });

        });

    }
    updateStudentCourses(){
        CourseService.studentCourseList = new Array<StudentCourses>();
        CourseService.registerStudentList.forEach(studentlist=>
          {
            //let course = studentlist.course;
            studentlist.student.forEach(student=>{
                let studentCourses = new StudentCourses();
                studentCourses.course = new Array();
                studentCourses.student = new Student();

                studentCourses.course.push(studentlist.course);
                studentCourses.student =student;

                let studentAlredyExists = CourseService.studentCourseList.find(o=>o.student===student);

                if(studentAlredyExists){

                    studentAlredyExists.course.push(studentlist.course);
                }
                else{
                    CourseService.studentCourseList.push(studentCourses);
                }
            })
          });
        //console.log(CourseService.studentCourseList);
    }
    getAllCourseByStudentId(id:number): StudentCourses {
        let obj=null;
        if(CourseService.studentCourseList){
            obj = CourseService.studentCourseList.find(o=>o.student.id===id);
        }
        return obj;
    }
    updateActualCourse(selectedCourse:Course, studentCount:number){
        CourseService.courseList.find(o=>o.id=== selectedCourse.id).registeredStudents = studentCount;
    }
    addCourse(course: Course){
        CourseService.courseList.push(course);
    }
    updateIndvidualCourse(course:Course){
        let courseModifed = CourseService.courseList.find(o=>o.id===course.id);
        courseModifed.title = course.title;
        courseModifed.description = course.description;
        courseModifed.isSelected = course.isSelected;
        courseModifed.maxNoOfStudents = course.maxNoOfStudents;
        //courseModifed.registeredStudents = course.registeredStudents;
    }
    getCourseMaxId(){
        return CourseService.maxCourseId;
    }
    setCourseMaxId(){
        CourseService.maxCourseId = CourseService.maxCourseId + 1;
    }
    getCourseById(id:number){
        return CourseService.courseList.find(o=>o.id===id);
    }
    getAllStudentsByCourseId (id:number): RegisterStudent {
        return CourseService.registerStudentList.find(o=>o.course.id===id);
    }




}
