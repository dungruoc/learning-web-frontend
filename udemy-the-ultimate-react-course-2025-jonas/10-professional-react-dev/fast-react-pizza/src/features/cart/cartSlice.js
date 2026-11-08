import { createSlice } from "@reduxjs/toolkit"

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];


const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // {pizzaId, name, quantity, unitPrice}
            const item = state.cart.find(p => p.pizzaId === action.payload.pizzaId);
            if (item)
                item.quantity += action.payload.quantity;
            else
                state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            console.log(state, action);
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseQuantity(state, action) {
            const item = state.cart.find(p => p.pizzaId === action.payload);
            if (item)
                item.quantity++;
        },
        decreaseQuantity(state, action) {
            const item = state.cart.find(p => p.pizzaId === action.payload);
            if (item && item.quantity > 0)
                item.quantity--;
        },
        clearCart(state, _) {
            state.cart = [];
        }
    }
});

export const { addItem, increaseQuantity, decreaseQuantity, deleteItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) => state.cart.cart.map(item => item.quantity).reduce((a, b) => a+b, 0);
export const getTotalCartPrice = (state) => state.cart.cart.map(item => item.quantity * item.unitPrice).reduce((a, b) => a+b, 0);

export const getSelectedQuantityById = (id) => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
