class ProductService {
    getProduct(id) {
        const products = {
            1: { name: "Laptop", price: 15000 },
            2: { name: "Teclado", price: 500 }
        };
        return products[id] || null;
    }
}

module.exports = ProductService;