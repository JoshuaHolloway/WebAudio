// [402]

// Fake db:
const products = [];

module.exports = class Product {

    // Define shape of product
    constructor(t) {
        this.title = t;
    }

    // Method to store to an array of products
    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}