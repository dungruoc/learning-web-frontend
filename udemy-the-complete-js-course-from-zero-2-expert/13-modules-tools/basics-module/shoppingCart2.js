export const ShoppingCart2 = (function() {
    const cart = [];

    const addToCart = function(product, quantity) {
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart`);
    }

    const totalQuantity = function() {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    return {
        addToCart,
        totalQuantity
    };
})();

