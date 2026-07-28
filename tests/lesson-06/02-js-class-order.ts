interface Items {
    name: string;
    price: number;
    amount: number;
    discount: number;
}

class Order {
    orderID: string;
    customerName: string;
    items: Items[];
    totalAmount: number;

    constructor(
        orderID: string,
        customerName: string
    ){
        this.orderID = orderID;
        this.customerName = customerName;
        this.items = [];
        this.totalAmount = 0;
    }

    addItem(item: Items){
        this.items.push(item);
        return this.items;
    }

    calculateTotal() {
        this.totalAmount = this.items.reduce((total, item) => {
            return total = total + item.price * item.amount * (1 - item.discount / 100);
        },0)
        return this.totalAmount;
    }
}

const orderItems = [
    {name: 'laptop', price: 20_000, amount: 6, discount: 10},
    {name: 'monitor',price: 5_000, amount: 10, discount: 5},
    {name: 'mouse', price: 2_000, amount: 8, discount: 0}
]
const order = new Order('Ord_01', 'Victor');
for(let item of orderItems){
    order.addItem(item);
}
// console.log(order);

console.log(`Total amount is`, order.calculateTotal());




