class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = 0;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getStock() {
        return this.stock;
    }

    setStock(stock) {
        this.stock = stock;
    }

    adjustStock(amount) {
        this.stock += amount;
    }
}

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }
}

class Order {
    constructor(id, user, products) {
        this.id = id;
        this.user = user;
        this.products = products; // Array of {product: Product, quantity: number}
        this.totalAmount = this.calculateTotal();
    }

    calculateTotal() {
        return this.products.reduce((total, item) => total + item.product.getPrice() * item.quantity, 0);
    }

    getId() {
        return this.id;
    }

    getUser() {
        return this.user;
    }

    getProducts() {
        return this.products;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}

class Payment {
    constructor(order, amount) {
        this.order = order;
        this.amount = amount;
        this.status = "Pending";
    }

    getOrder() {
        return this.order;
    }

    getAmount() {
        return this.amount;
    }

    getStatus() {
        return this.status;
    }

    markAsPaid() {
        this.status = "Paid";
    }
}

class ECommercePlatform {
    constructor() {
        this.products = [];
        this.users = [];
        this.orders = [];
        this.payments = [];
    }

    addProduct(product) {
        this.products.push(product);
        console.log(`Product added: ${product.getName()}`);
    }

    addUser(user) {
        this.users.push(user);
        console.log(`User added: ${user.getName()}`);
    }

    createOrder(userId, productOrders) {
        const user = this.users.find(u => u.getId() === userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const products = productOrders.map(po => {
            const product = this.products.find(p => p.getId() === po.productId);
            if (!product) {
                throw new Error(`Product with ID ${po.productId} not found.`);
            }
            if (product.getStock() < po.quantity) {
                throw new Error(`Not enough stock for product ${product.getName()}.`);
            }
            product.adjustStock(-po.quantity);
            return { product, quantity: po.quantity };
        });

        const order = new Order(this.orders.length + 1, user, products);
        this.orders.push(order);
        console.log(`Order created: ${order.getId()}`);
        return order;
    }

    processPayment(orderId) {
        const order = this.orders.find(o => o.getId() === orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }

        const payment = new Payment(order, order.getTotalAmount());
        this.payments.push(payment);
        payment.markAsPaid();
        console.log(`Payment processed for order ${orderId}. Status: ${payment.getStatus()}`);
        return payment;
    }

    printProducts() {
        console.log("Products:");
        this.products.forEach(product => {
            console.log(`ID: ${product.getId()}, Name: ${product.getName()}, Price: ${product.getPrice()}, Stock: ${product.getStock()}`);
        });
    }

    printUsers() {
        console.log("Users:");
        this.users.forEach(user => {
            console.log(`ID: ${user.getId()}, Name: ${user.getName()}, Email: ${user.getEmail()}`);
        });
    }

    printOrders() {
        console.log("Orders:");
        this.orders.forEach(order => {
            console.log(`Order ID: ${order.getId()}, User: ${order.getUser().getName()}, Total: ${order.getTotalAmount()}`);
            order.getProducts().forEach(item => {
                console.log(`  Product: ${item.product.getName()}, Quantity: ${item.quantity}`);
            });
        });
    }

    printPayments() {
        console.log("Payments:");
        this.payments.forEach(payment => {
            console.log(`Order ID: ${payment.getOrder().getId()}, Amount: ${payment.getAmount()}, Status: ${payment.getStatus()}`);
        });
    }
}


(function main() {
    const platform = new ECommercePlatform();

    // Add products with stock
    const laptop = new Product(1, "Laptop", 1000);
    const smartphone = new Product(2, "Smartphone", 500);
    const headphones = new Product(3, "Headphones", 100);

    laptop.setStock(10);
    smartphone.setStock(20);
    headphones.setStock(15);

    platform.addProduct(laptop);
    platform.addProduct(smartphone);
    platform.addProduct(headphones);

    // Add users
    platform.addUser(new User(1, "Alice", "alice@example.com"));
    platform.addUser(new User(2, "Bob", "bob@example.com"));

    // Create an order
    try {
        const order = platform.createOrder(1, [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 }
        ]);

        // Process payment
        platform.processPayment(order.getId());
    } catch (e) {
        console.log(e.message);
    }

    // Print current state
    platform.printProducts();
    platform.printUsers();
    platform.printOrders();
    platform.printPayments();
})();
