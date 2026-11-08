// import { useDispatch } from "react-redux";
// import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
// import { deleteItem } from "./cartSlice";
import UpdateCartItemQuantity from "./UpdateCartItemQuantity";

function CartItem({ item }) {
  // const dispatch = useDispatch();

  const { pizzaId, name, quantity, unitPrice } = item;
  const totalPrice = quantity * unitPrice;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-12">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        {/* <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button> */}
        <UpdateCartItemQuantity pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;