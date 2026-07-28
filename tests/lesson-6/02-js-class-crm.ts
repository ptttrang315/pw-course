class Customer {
    id: string;
    name: string;
    email: string;
    phone: string;

    constructor(
        id: string, 
        name: string, 
        email: string,
        phone: string
    ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    displayInfo() {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`)
    }

    updateEmail(newEmail: string) {
        this.email = newEmail;
    }
}

const customer1 = new Customer('Cust_01', 'Ana', 'ana@mail.com','8432432442');

customer1.displayInfo();
customer1.updateEmail('newEmail@mail.com');
customer1.displayInfo();
