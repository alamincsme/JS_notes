class GroceryProduct {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }
}

class Fruit extends GroceryProduct {
    constructor(name, price) {
        super(name, price);
    }
}

class Meat extends GroceryProduct {
    constructor(name, price) {
        super(name, price);
    }
}

class Vegetable extends GroceryProduct {
    constructor(name, price) {
        super(name, price);
    }
}

class DiscountCalculator {
    calculateDiscount(product) {
        throw new Error('This method should be overridden!');
    }
}

class NonMemberDiscountCalculator extends DiscountCalculator {
    calculateDiscount(product) {
        console.log("Non Member has no discount.");
        return 0.0;
    }
}

class PremiumMemberDiscountCalculator extends DiscountCalculator {
    calculateDiscount(product) {
        return product.getPrice() * 0.15;
    }
}

class RegularMemberDiscountCalculator extends DiscountCalculator {
    calculateDiscount(product) {
        return product.getPrice() * 0.1;
    }
}

const MemberShipStatus = Object.freeze({
    REGULAR: 'REGULAR',
    PREMIUM: 'PREMIUM',
    NON_MEMBER: 'NON_MEMBER'
});

class Customer {
    constructor(name, memberShipStatus) {
        this.name = name;
        this.memberShipStatus = memberShipStatus;
        switch (memberShipStatus) {
            case MemberShipStatus.REGULAR:
                this.discountCalculator = new RegularMemberDiscountCalculator();
                break;
            case MemberShipStatus.PREMIUM:
                this.discountCalculator = new PremiumMemberDiscountCalculator();
                break;
            default:
                this.discountCalculator = new NonMemberDiscountCalculator();
        }
    }

    getDiscountCalculator() {
        return this.discountCalculator;
    }
}

class GroceryStoreShoppingCart {
    constructor(customer) {
        this.products = [];
        this.customer = customer;
    }

    addProduct(product) {
        this.products.push(product);
    }

    checkout() {
        let totalPrice = 0.0;
        for (const product of this.products) {
            const discount = this.customer.getDiscountCalculator().calculateDiscount(product);
            totalPrice += (product.getPrice() - discount);
        }
        return totalPrice;
    }
}

function main() {
    const banana = new Fruit("Banana", 0.5);
    const carrot = new Vegetable("Carrot", 0.25);
    const steak = new Meat("Steak", 5.00);

    const customer = new Customer("Alamin", MemberShipStatus.PREMIUM);

    const cart = new GroceryStoreShoppingCart(customer);
    cart.addProduct(banana);
    cart.addProduct(carrot);
    cart.addProduct(steak);

    const totalAmount = cart.checkout();
    console.log("Amount = " + totalAmount);
}
main() ; 
