import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, deleteItem, getSelectedQuantityById, increaseQuantity } from "./cartSlice";
import Button from "../../ui/Button";

function UpdateCartItemQuantity({pizzaId}) {
  const selectedQuantity = useSelector(getSelectedQuantityById(pizzaId));
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
        <Button type="sround" onClick={() => dispatch(decreaseQuantity(pizzaId))}>−</Button>
        <span className="text-xs md:text-sm">{selectedQuantity}</span>
        <Button type="sround" onClick={() => dispatch(increaseQuantity(pizzaId))}>＋</Button>
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
    </div>
  );
}

export default UpdateCartItemQuantity;