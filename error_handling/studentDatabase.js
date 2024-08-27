class DuplicateStudentException extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicateStudentException";
    }
}

class StudentNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "StudentNotFoundException";
    }
}

class Student {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
}

class StudentDatabase {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        const id = student.getId();
        if (this.students.some(s => s.getId() === id)) {
            throw new DuplicateStudentException(`A student with ID ${id} already exists.`);
        }
        this.students.push(student);
        console.log("Added successfully.");
    }

    deleteStudent(id) {
        const index = this.students.findIndex(s => s.getId() === id);
        if (index === -1) {
            throw new StudentNotFoundException(`A student with ID ${id} does not exist.`);
        }
        this.students.splice(index, 1);
        console.log("Deleted successfully.");
    }

    searchStudent(id) {
        const student = this.students.find(s => s.getId() === id);
        if (!student) {
            throw new StudentNotFoundException(`A student with ID ${id} does not exist.`);
        }
        return student;
    }

    size() {
        return this.students.length;
    }

    getStudentInfo() {
        if (this.students.length === 0) {
            console.log("No students in the database.");
        } else {
            console.log("Students in the database:");
            this.students.forEach(student => {
                console.log(`ID: ${student.getId()}, Name: ${student.getName()}`);
            });
        }
    }
}


(function main() {
    const db = new StudentDatabase();

    try {
        db.addStudent(new Student("ANM Bazlur Rahman", 101));
        db.addStudent(new Student("Mukit Chowdhory", 102));
        db.addStudent(new Student("Mohammad Alamin", 103));
    } catch (e) {
        if (e instanceof DuplicateStudentException) {
            console.log("Duplicate student found.");
        }
    }

    try {
        db.deleteStudent(101);
    } catch (e) {
        if (e instanceof StudentNotFoundException) {
            console.log("Student not found.");
        }
    }

    console.log("Number of students in the database:", db.size());
    db.getStudentInfo() ; 
})();
