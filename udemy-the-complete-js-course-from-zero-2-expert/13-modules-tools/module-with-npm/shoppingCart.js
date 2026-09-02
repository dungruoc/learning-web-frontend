console.log('Exporting Module');

const shippingCost = 20;
const cart = [];

export const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} items of ${product} added to cart`);
}

const totalQuantity = function() {
    return cart.reduce((acc, element) => acc + element.quantity, 0);
}

export { totalQuantity };