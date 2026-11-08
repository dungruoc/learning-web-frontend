import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";

// const fakeCart = [
//     {
//         pizzaId: 12,
//         name: "Mediterranean",
//         quantity: 2,
//         unitPrice: 16,
//         totalPrice: 32,
//     },
//     {
//         pizzaId: 6,
//         name: "Vegetale",
//         quantity: 1,
//         unitPrice: 13,
//         totalPrice: 13,
//     },
//     {
//         pizzaId: 11,
//         name: "Spinach and Mushroom",
//         quantity: 1,
//         unitPrice: 15,
//         totalPrice: 15,
//     },
// ];

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const navigation = useNavigation();
    const actionData = useActionData();
    const {userName, status: addressStatus, position, address, error: addressError} = useSelector(st => st.user);
    const cart = useSelector(st => st.cart.cart);
    const dispatch = useDispatch();
    const isSubmitting = navigation.state === 'submitting';
    const isLoaddingAddress = addressStatus === 'loading';

    console.log(userName, addressStatus, position, address);
    console.log('form Action', actionData);

    return (
        <div className="px-4 py-6">
            <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

            <Form method="POST" action="/order/new">
                <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <div className="grow">
                        <input type="text" name="customer" required
                            className="input" defaultValue={userName} />
                    </div>
                </div>
                    
                <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input type="tel" name="phone" required
                            className="input" />
                        {actionData?.errors?.phone &&
                            <p className="mt-2 text-xs text-red-700 bg-red-100 rounded-md">
                                {actionData.errors.phone}
                            </p>}
                    </div>
                </div>
                
                <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center relative">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input type="text" name="address" required
                        defaultValue={address} disabled={isLoaddingAddress}
                        className="input" />
                        {addressError &&
                            <p className="mt-2 text-xs text-red-700 bg-red-100 rounded-md">
                                {addressError}
                            </p>}
                    </div>
                    {(!position.latitude || !position.longitude) &&
                    <span className="absolute right-1 top-1 z-50">
                        <Button type="small"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(fetchAddress());
                            }}
                        >
                            Get Position
                        </Button>
                            
                    </span>}
                </div>
                
                <div className="mb-12 flex items-center gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                        className="h-6 w-6 accent-yellow-400 focus:outline-none
                            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                    />
                    <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
                </div>
                
                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                    <input type="hidden" name="position" value={
                        (position.latitude && position.longitude) ? JSON.stringify(position) : ""
                    } />
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? 'Placing order...' : 'Order now'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateOrder;