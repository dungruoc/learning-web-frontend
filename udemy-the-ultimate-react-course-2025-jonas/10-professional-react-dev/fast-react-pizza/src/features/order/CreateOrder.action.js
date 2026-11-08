import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log('form data', data);

    const order = {
        ...data,
        cart: JSON.parse(data.cart).map(item => ({...item, totalPrice: item.quantity * item.unitPrice})),
        priority: data.priority === "true"
    }
    console.log(order);
    
    const actionData = {
        errors: {}
    };
    if (!isValidPhone(order.phone))
        actionData.errors.phone = "Please give your valid phone number to contact you for delivery!";
    

    if (Object.keys(actionData.errors).length > 0)
        return actionData;

    const newOrder = await createOrder(order);
    console.log(newOrder);

    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
}