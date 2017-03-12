import { Injectable } from '@angular/core';
import { Student } from './../business-object/student';

@Injectable()
export class StudentService {
    static studentList: Array<Student>;
    static maxStudentId:number;
    /*
    studentListType: 1 - displaying all students
    studentListType: 2 - displaying all students in sepecific course
    */
    static studentListType: number;
    constructor() {
        StudentService.studentList = new Array<Student>();
        StudentService.maxStudentId = 5;
        StudentService.studentListType = 1;
        this.populateStudents();
    }

    getStudentList(): Array<Student> {
        return StudentService.studentList;
    }
    private populateStudents(){
        StudentService.studentList.
        push({ id: 1, firstName: 'Muhammad', lastName: 'Ahmed', schoolInYear: 2000, isSelected: false });

        StudentService.studentList.
        push({ id: 2, firstName: 'Muhammad', lastName: 'Saeed', schoolInYear: 2001, isSelected: false });

        StudentService.studentList.
        push({ id: 3, firstName: 'Brain', lastName: 'Adam', schoolInYear: 2002, isSelected: false });

        StudentService.studentList.
        push({ id: 4, firstName: 'Paul', lastName: 'Smith', schoolInYear: 2003, isSelected: false });

        StudentService.studentList.
        push({ id: 5, firstName: 'Imran', lastName: 'Khan', schoolInYear: 2002, isSelected: false });
    }

    setStudentListType(studentType:number) {
        StudentService.studentListType = studentType;
    }
    addStudent(student: Student){
        StudentService.studentList.push(student);
        //console.log(StudentService.studentList);
    }
    updateIndvidualStudent(student:Student){
        let studentModifed = StudentService.studentList.find(o=>o.id===student.id);
        studentModifed.firstName = student.firstName;
        studentModifed.lastName = student.lastName;
        studentModifed.schoolInYear = student.schoolInYear;
    }
    getStudentMaxId(){
        return StudentService.maxStudentId;
    }
    setStudentMaxId(){
        StudentService.maxStudentId = StudentService.maxStudentId + 1;
    }
    getStudentById(id:number){
        return StudentService.studentList.find(o=>o.id===id);
    }
}
