import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import {accountReducer } from './features/accounts/accountSlice';
import { customerReducer } from './features/customers/customerSlice';

const rootReducer = combineReducers({
    customer: customerReducer,
    account: accountReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
