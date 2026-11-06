import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === true
    }
    console.log(order);
    
    const err = {};
    if (!isValidPhone(order.phone))
        err.phone = "Please give your valid phone number to contact you for delivery!";
    

    if (Object.keys(err).length > 0)
        return err;

    const newOrder = await createOrder(order);
    console.log(newOrder);

    return redirect(`/order/${newOrder.id}`); 
}