import { Injectable }  from '@angular/core';
import { CourseService } from './course.service';
import { StudentService } from './student.service';
import { Course } from './../business-object/course';
import { Student } from './../business-object/student';
import { RegisterStudent } from './../business-object/register-student';
import { StudentCourses } from './../business-object/student-course';

@Injectable()
export class FacadeService {
    constructor(private courseService: CourseService, private studentService: StudentService){
        this.courseService = courseService;
        this.studentService = studentService;
    }

    //course API
    getCourseList(): Array<Course> {
        return this.courseService.getCourseList();
    }

    getStudentList(): Array<Student>{
        return this.studentService.getStudentList();
    }
    updateCourse(selectedCourses:Array<Course>, selectedStudents:Array<Student> ){
        //console.log(selectedCourses.length);
        //console.log(selectedStudents.length);
        this.courseService.updateCourse(selectedCourses, selectedStudents);
    }
    updateStudentCourses(){
        this.courseService.updateStudentCourses();
    }
    getAllCourseByStudentId(id: number): StudentCourses {
        return this.courseService.getAllCourseByStudentId(id);
    }
    addCourse(course: Course){
        this.courseService.addCourse(course);
    }
    updateIndvidualCourse(course:Course){
        this.courseService.updateIndvidualCourse(course);
    }
    getCourseMaxId(){
        return this.courseService.getCourseMaxId();
    }
    setCourseMaxId(){
        this.courseService.setCourseMaxId();
    }
    getCourseById(id:number){
        return this.courseService.getCourseById(id);
    }

    //student API
    addStudent(student: Student){
        this.studentService.addStudent(student);
    }
    updateIndvidualStudent(student: Student){
        this.studentService.updateIndvidualStudent(student);
    }
    getStudentMaxId(){
        return this.studentService.getStudentMaxId();
    }
    setStudentMaxId(){
        this.studentService.setStudentMaxId();
    }
    getStudentById(id:number){
        return this.studentService.getStudentById(id);
    }

    //Register Students
    getAllStudentsByCourseId(courseId: number): RegisterStudent{
        return this.courseService.getAllStudentsByCourseId(courseId);
    }

}
