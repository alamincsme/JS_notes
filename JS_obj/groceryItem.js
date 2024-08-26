//Al Amin
const groceryProduct = {
    productId: "GP-2024-007",
    name: "Organic  Milk",
    brand: "Nestle",
    category: "Beverages",
    price: 4.99, 
    inStock: true,
    quantity: 50, 

    // Array of coupons applicable to the product
    coupons: [
        {
            code: "SAVE10",
            discountPercentage: 10,
            validUntil: "2024-12-31"
        },
        {
            code: "FREESHIP",
            discountPercentage: 0,
            freeShipping: true,
            validUntil: "2024-11-30"
        }
    ],

  
    applyCoupon: function(couponCode) {
        const coupon = this.coupons.find(c => c.code === couponCode && new Date(c.validUntil) >= new Date());
        
        if (!coupon) {
            return `Invalid or expired coupon code.`;
        }
        
        let finalPrice = this.price;
        
        if (coupon.discountPercentage > 0) {
            finalPrice -= (this.price * (coupon.discountPercentage / 100));
        }

        if (coupon.freeShipping) {
            return `Discounted Price: $${finalPrice.toFixed(2)} with free shipping.`;
        } else {
            return `Discounted Price: $${finalPrice.toFixed(2)}`;
        }
    }
};


console.log(groceryProduct.applyCoupon("SAVE10")); 
console.log(groceryProduct.applyCoupon("FREESHIP")); 
console.log(groceryProduct.applyCoupon("INVALID")); 
