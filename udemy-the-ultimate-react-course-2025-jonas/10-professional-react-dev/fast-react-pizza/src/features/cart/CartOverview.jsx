import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const nbPizzas = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!nbPizzas)
    return null;

  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{nbPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;