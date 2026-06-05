// Task 1
const car = {
    make: "Toyota",
    model: "Corolla",
    year: 2021
}

console.log(`Year is ${car.year}`);

// Task 2
const person = {
    name: "John",
    address: {
        street: "Wall Street",
        city: "New York",
        country: "United States"
    }
}

console.log(`The street is ${person.address.street}`);

// Task 3
const student = {
    name: "Bob",
    grades: {
        math: 10,
        english: 4
    }
}

console.log(`Math score is ${student["grades"]["math"]}`);

// Task 4
const settings = {
    volume: 20,
    brightness: 30
};

settings.volume = 40;

console.log(`Volume after updating is ${settings.volume}`);

// Task 5
const bike = {};
bike.color = "blue";

// Task 6
const employee = {
    name: "Employee 1",
    age: 34
}
delete employee.age;

// Task 7
const school = {
    classA: ["An", "Binh", "Chau"],
    classB: ["Dao", "Huong", "Giang"]
}

