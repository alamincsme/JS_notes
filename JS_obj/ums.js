//Al Amin
class University {
    constructor(name, location, fees) {
        this.name = name;
        this.location = location;
        this.fees = fees;
        this.departments = [];
    }

    static universityMotto() {
        return 'Knowledge is Power';
    }

    addDepartment(department) {
        this.departments.push(department);
    }

    getTotalStudents() {
        return this.departments.reduce((total, dept) => total + dept.students.length, 0);
    }

    getDepartmentNames() {
        return this.departments.map(dept => dept.name).join(', ');
    }
}

// Department class
class Department {
    constructor(name) {
        this.name = name;
        this.courses = [];
        this.students = [];
    }

    addCourse(course) {
        this.courses.push(course);
    }

    enrollStudent(student) {
        this.students.push(student);
    }

    listCourses() {
        return this.courses.map(course => course.name).join(', ');
    }

    listStudents() {
        return this.students.map(student => student.name).join(', ');
    }
}

// Course class
class Course {
    constructor(name, creditHours) {
        this.name = name;
        this.creditHours = creditHours;
    }
}

// Student class
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.courses = [];
    }

    enrollInCourse(course) {
        this.courses.push(course);
    }

    listEnrolledCourses() {
        return this.courses.map(course => course.name).join(', ');
    }
}


const university = new University('University of Dhaka', 'Dhaka, Bangladesh', 5000);

const csDepartment = new Department('Computer Science');
const econDepartment = new Department('Economics');

const course1 = new Course('Data Structures', 3);
const course2 = new Course('Algorithms', 4);
const course3 = new Course('Microeconomics', 3);

csDepartment.addCourse(course1);
csDepartment.addCourse(course2);
econDepartment.addCourse(course3);

const student1 = new Student('Rezaur Rahman', 21);
const student2 = new Student('Ayesha Siddiqui', 22);

student1.enrollInCourse(course1);
student1.enrollInCourse(course2);
student2.enrollInCourse(course3);

csDepartment.enrollStudent(student1);
econDepartment.enrollStudent(student2);

university.addDepartment(csDepartment);
university.addDepartment(econDepartment);

console.log('University Name:', university.name);
console.log('University Motto:', University.universityMotto());
console.log('Total Students:', university.getTotalStudents());
console.log('Departments:', university.getDepartmentNames());
console.log('Courses in CS Department:', csDepartment.listCourses());
console.log('Courses in Economics Department:', econDepartment.listCourses());
console.log('Students in CS Department:', csDepartment.listStudents());
console.log('Students in Economics Department:', econDepartment.listStudents());
console.log(student1.name + ' is enrolled in: ' + student1.listEnrolledCourses());
