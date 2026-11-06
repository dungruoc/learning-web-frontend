import { getOrder } from "../../services/apiRestaurant";

export async function loader({params}) {
    const order = await getOrder(params.orderId);
    console.log(order);
    return order;
}