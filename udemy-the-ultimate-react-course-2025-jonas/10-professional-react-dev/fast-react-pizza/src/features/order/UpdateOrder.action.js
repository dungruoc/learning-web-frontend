import { updateOrder } from "../../services/apiRestaurant";

export async function action({request, params}) {
    console.log(request, params);
    const data = {priority: true};
    await updateOrder(params.orderId, data);
    return null;
}