//Al Amin
const product = {
    id: 101,
    name: "Wireless Mouse",
    brand: "TechBrand",
    price: 29.99,
    categories: ["electronics", "accessories"],
    inStock: true,
    discount: 10,
    ratings: {
        average: 4.5,
        count: 150
    },
    
    getDiscountedPrice: function () {
        return this.price - (this.price * (this.discount / 100));
    },

    //full product info
    getProductInfo: function () {
        return `Product: ${this.name} by ${this.brand}\nPrice: $${this.price}\nDiscounted Price: $${this.getDiscountedPrice()}\nRating: ${this.ratings.average} (${this.ratings.count} reviews)`;
    }
};

console.log(product.getProductInfo());
/*
Output:
Product: Wireless Mouse by TechBrand
Price: $29.99
Discounted Price: $26.99
Rating: 4.5 (150 reviews)
*/
console.log(product.categories);
console.log(product.inStock);
