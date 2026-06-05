// Task 1
function multiply(a, b) {
    return a * b;
}

console.log(multiply(20, 50));
console.log(multiply(4, 7));

// Task 2
function minOfTwo(m, n) {
    if(m > n) {
        return n;
    } else {
        return m;
    }
}

function findMin(a, b, c) {
    return minOfTwo(minOfTwo(a, b), c);
}

console.log(findMin(1,2,7));
console.log(findMin(21,13,8));

// Task 3
const students = [
    {name: "Will", score: 8},
    {name: "Lucy", score: 10},
    {name: "Alex", score: 7},
    {name: "Harley", score: 6},
    {name: "Victor", score: 5}
];

function getTopStudents(students, threshold) {
    let topStudents = [];
    for(let i = 0; i < students.length; i++) {
        if (students[i].score >= threshold){
            topStudents.push(students[i].name); 
        }
    }
    return topStudents;
}

console.log(getTopStudents(students, 8));

// Task 4
function calculateInterest(principal, rate, years){
    return principal + principal * rate * years/ 100;
}

console.log(calculateInterest(10000, 5, 2));