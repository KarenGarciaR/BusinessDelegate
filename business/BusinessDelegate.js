const UserService = require('../services/UserService');
const ProductService = require('../services/productService');

class BusinessDelegate {
    constructor() {
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    getUserInfo(id) {
        return this.userService.getUser(id);
    }

    getProductInfo(id) {
        return this.productService.getProduct(id);
    }
}

module.exports = BusinessDelegate;