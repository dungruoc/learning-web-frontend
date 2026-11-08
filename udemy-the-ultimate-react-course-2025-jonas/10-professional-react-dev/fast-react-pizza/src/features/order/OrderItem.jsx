import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, ingredients}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex flex-row justify-between sm:flex-col">
      <div className="py-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:py-1
        text-sm text-stone-600 font-medium">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs capitalize text-stone-500 self-center sm:self-start">{ingredients.join(', ')}</p>
    </li>
  );
}

export default OrderItem;