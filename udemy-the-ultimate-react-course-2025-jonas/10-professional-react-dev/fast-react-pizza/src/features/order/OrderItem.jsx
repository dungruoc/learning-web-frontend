import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="py-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:py-1
        text-sm text-stone-600 font-medium">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;