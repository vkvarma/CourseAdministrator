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
        this.populateCourses();
    }



    getCourseList() : Array<Course> {
        return CourseService.courseList;
    }
    private populateCourses(){
        CourseService.courseList.push({
            id:1, title: 'Software Engineering',registeredStudents:0,maxNoOfStudents:10, isSelected:false,
            description: 'Software engineering (SWE) is the application of engineering to the development of software in a systematic method.[1][2][3] Typical formal definitions of Software Engineering are: Research, design, develop, and test operating systems-level software, compilers, and network distribution software for medical, industrial, military, communications, aerospace, business, scientific, and general computing applications.[4] the systematic application of scientific and technological knowledge, methods, and experience to the design, implementation, testing, and documentation of software;[5]'});
        CourseService.courseList.push({
            id:2, title: 'Project Managment', registeredStudents:0,maxNoOfStudents:10,isSelected:false,
            description: 'Project management is the discipline of initiating, planning, executing, controlling, and closing the work of a team to achieve specific goals and meet specific success criteria. A project is a temporary endeavor designed to produce a unique product, service or result with a defined beginning and end (usually time-constrained, and often constrained by funding or deliverables) undertaken to meet unique goals and objectives, typically to bring about beneficial change or added value.[1]['});
        CourseService.courseList.push({
            id:3, title: 'Internet of Things',registeredStudents:0,maxNoOfStudents:15,isSelected:false,
            description: 'The Internet of things (stylized Internet of Things or IoT) is the inter-networking of physical devices, vehicles (also referred to as "connected devices" and "smart devices"), buildings, and other items—embedded with electronics, software, sensors, actuators, and network connectivity that enable these objects to collect and exchange data.[1][2][3] In 2013 the Global Standards Initiative on Internet of Things (IoT-GSI) '});
        CourseService.courseList.push({
            id:4, title: 'Operation Research',registeredStudents:0,maxNoOfStudents:20,isSelected:false,
            description: 'Operations research, or operational research in British usage, is a discipline that deals with the application of advanced analytical methods to help make better decisions.[1] Further, the term operational analysis is used in the British (and some British Commonwealth) military, as an intrinsic part of capability development, management and assurance. In particular, operational analysis forms part of the Combined Operational Effectiveness and Investment Appraisals (COEIA), which support British defence capability acquisition decision-making.'});
        CourseService.courseList.push({
            id:5, title: 'Artificial Intelligence',registeredStudents:0,maxNoOfStudents:15,isSelected:false,
            description: 'Artificial intelligence (AI) is intelligence exhibited by machines. In computer science, the field of AI research defines itself as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of success at some goal'});
        CourseService.courseList.push({
            id:6, title: 'Programming Best Practices',registeredStudents:0,maxNoOfStudents:25,isSelected:false,
            description: 'In Ninety-ninety rule, Tom Cargill is credited with this explanation as to why programming projects often run late: "The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time." Any guidance which can redress this lack of foresight is worth considering.'});
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
