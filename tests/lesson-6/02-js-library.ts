class Library {
    name: string;
    location: string;
    books: string[];

    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
        this.books = [];
    }

    addBook(book: string)  {
        this.books.push(book)
    }

    findBook(bookName: string){
        return this.books.filter(name => name.includes(bookName))
        
    }
}

const books = [
    'The Prince', 
    'Game of Thrones', 
    'The Power of Now', 
    'Sapiens - The Birth of Humankind', 
    'Sapiens - The Pillars of Civilization'
]

const library = new Library('Inspiration', 'Block B');

// Adding books into library
for(let book of books) {
    library.addBook(book);
}
console.log(library);

// Find books
let findingBook = library.findBook('Civilization')
console.log(findingBook);




