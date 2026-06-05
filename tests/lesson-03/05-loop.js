// Task 1
// Sum from 1 to 100
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum = sum + i;
}
console.log(`sum = ${sum}`);

console.log("----------------------");
// Task 2
for (let i = 2; i <=9; i++) {
    for (let j = 1; j <=10; j++){
        console.log(`${i} x ${j} = `,i*j);
    }

    console.log("----------------------");
}

// Task 3
// Create an array for odd numbers from 1 to 99
const arr = [];
for (let i = 1; i <= 99; i++){
    if (i % 2 != 0){
        arr.push(i);
    }
}
console.log(arr);

console.log("----------------------");
// Task 4
for (let i = 1; i <= 10; i++){
    console.log(`user${i}@example.com`);
}

console.log("----------------------");
// Task 5
const revenue = [
    {"month": 1, "total": 100},
    {"month": 2, "total": 150},
    {"month": 3, "total": 350},
    {"month": 4, "total": 233},
    {"month": 5, "total": 250},
    {"month": 6, "total": 700},
    {"month": 7, "total": 150},
    {"month": 8, "total": 200},
    {"month": 9, "total": 100},
    {"month": 10, "total": 340},
    {"month": 11, "total": 343},
    {"month": 12, "total": 500},
]
let totalOfYear = 0;

for (let i = 0; i< revenue.length; i++) {
    totalOfYear = totalOfYear + revenue[i].total;
}

console.log(`totalOfYear = ${totalOfYear}`);
