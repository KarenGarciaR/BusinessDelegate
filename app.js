const BusinessDelegate = require('./business/BusinessDelegate');
const delegate = new BusinessDelegate();

console.log("Información de usuario:");
console.log(delegate.getUserInfo(1));

console.log("\nInformación de producto:");
console.log(delegate.getProductInfo(1));