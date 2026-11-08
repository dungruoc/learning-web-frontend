import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';

import { clearCart, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function Cart() {
  const user = useSelector(st => st.user);
  const cart = useSelector(st => st.cart.cart);
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalCartPrice);

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {cart.length ?
        <>
          <h2 className='mt-7 text-xl font-semibold'>Your cart, {user.userName}</h2>

          <ul>
            {cart.map(item => <CartItem key={item.pizzaId} item={item}/>)}
          </ul>
          <p className='mt-2'>Total Price: <span className='font-bold'>{formatCurrency(totalPrice)}</span></p>
          <div className='mt-6 space-x-2'>
            <Button to="/order/new" type='primary'>Order pizzas</Button>
            <Button type='secondary' onClick={() => dispatch(clearCart())}>Clear cart</Button>
          </div>
        </>
        :
        <p className='mt-8 text-stone-800 font-semibold'>
          Yummy! Please select pizzas from the menu! 🍕🤩
        </p>
      }
    </div>
  );
}

export default Cart;