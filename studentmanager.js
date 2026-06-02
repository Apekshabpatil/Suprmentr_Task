// Array of student objects
let students = [
    {
        name: "Apeksha",
        marks: [90, 85, 90]
    },
    {
        name: "Rahul",
        marks: [78, 82, 80]
    },
    {
        name: "Priya",
        marks: [92, 95, 89]
    }
];

// Calculate average for each student
students.forEach(student => {
    let total = student.marks.reduce((sum, mark) => sum + mark, 0);
    let average = total / student.marks.length;

    console.log("Student Name:", student.name);
    console.log("Marks:", student.marks);
    console.log("Average:", average.toFixed(2));
});