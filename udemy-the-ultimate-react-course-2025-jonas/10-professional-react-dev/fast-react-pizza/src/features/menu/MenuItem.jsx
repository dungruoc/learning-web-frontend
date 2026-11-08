import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getSelectedQuantityById } from "../cart/cartSlice";
import UpdateCartItemQuantity from "../cart/UpdateCartItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id,  name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const selectedQuantity = useSelector(getSelectedQuantityById(id));

  function handleAddCart() {
    const item = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1
    };

    dispatch(addItem(item));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ?
            <p className="text-sm">{formatCurrency(unitPrice)}</p> :
            <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {!soldOut &&
            <div className="flex gap-2 items-center">
              {selectedQuantity ?
                <UpdateCartItemQuantity pizzaId={id} />
              : <Button type="small" onClick={handleAddCart}>Add to Cart</Button>
              }              
            </div>
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;