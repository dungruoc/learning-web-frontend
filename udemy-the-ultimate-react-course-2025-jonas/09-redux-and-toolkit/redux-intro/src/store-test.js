import { createStore, combineReducers } from 'redux';

import {accountReducer, deposit, withdraw, requestLoan, approveLoan, payLoan} from './features/accounts/accountSlice';
import { customerReducer, createCustomer, updateCustomerName } from './features/customers/customerSlice';

const rootReducer = combineReducers({
    customer: customerReducer,
    account: accountReducer
});

const store = createStore(rootReducer);

export default store;

store.dispatch(deposit(100));
console.log('Redux run', store.getState());

store.dispatch(withdraw(20));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a car"));
console.log(store.getState());

store.dispatch(approveLoan());
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());


store.dispatch(createCustomer("John Doe", "1234567"));
console.log(store.getState());

store.dispatch(updateCustomerName("Joe Doe"));
console.log(store.getState());
