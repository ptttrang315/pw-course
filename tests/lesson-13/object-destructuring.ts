// Ex1:
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    occupation: 'Software Engineer'
};

const { firstName: myFirstName, lastName: myLastName, age: myAge } = person;

console.log('First name:', myFirstName);
console.log('Last name:', myLastName);
console.log('Age:', myAge);

// Ex2:
const car = {
    brand: 'Toyota',
    model: ' Camry',
    year: 2022,
    color: 'white'
}
const { brand, model, year, color } = car;

console.log('Brand: ', brand);
console.log('Model: ', model);
console.log('Year: ', year);
console.log('Color: ', color);

// Ex3:
const user = {};
const { name = 'Guest' } = user;

console.log('Name: ', name);

// Ex4:
const product = {};
const { price = 0 } = product;

console.log('Price:', price);

// Ex5:
const book = {
    title: 'Sapiens'
};
const { title: bookTitle } = book;

console.log('My new book is', bookTitle);

// Ex6:
const movie = {
    director : 'Christopher'
};
const { director: filmDirector } = movie;

console.log("Film's director is", filmDirector);

// Ex7:
const person2 = {
    address : {
        street : "234 Inda",
        city : "NY",
        country: "United State" 
    }
}
const { address: {street} } = person2;

console.log("The street is", street);

// Ex8:
const product2 = {
    details : {
        brandProduct2: 'Apple',
        modelProduct2: '16 pro max',
        colorProduct2: 'light blue'
    }
}
const { details: {modelProduct2} } = product2;

console.log("The model is", modelProduct2);