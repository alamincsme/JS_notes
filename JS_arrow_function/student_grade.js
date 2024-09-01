
const students = [
    { name: "Alice", grade: 85 },
    { name: "Bob", grade: 58 },
    { name: "Charlie", grade: 92 },
    { name: "David", grade: 74 },
    { name: "Eve", grade: 64 },
    { name: "Frank", grade: 47 }
];

const processGrades = students => {
    const passingStudents = students.filter(student => student.grade >= 60);

    const averageGrade = passingStudents.reduce((sum, student) => sum + student.grade, 0) / passingStudents.length;

    const sortedStudents = passingStudents.sort((a, b) => b.grade - a.grade);

    return { averageGrade, sortedStudents };
};

const result = processGrades(students);

console.log(`Average Grade: ${result.averageGrade.toFixed(2)}`);
console.log("Sorted Students by Grade:");
result.sortedStudents.forEach(student => console.log(`${student.name}: ${student.grade}`));
