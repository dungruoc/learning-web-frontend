import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isConvertingCurrency: false
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit: {
            prepare(amount, currency) {
                return {
                    payload: {
                        amount,
                        currency
                    }
                };
            },
            reducer(state, action) {
                // mutable but compiled by toolkit to be immutable functions
                state.balance = state.balance + action.payload.amount;
                state.isConvertingCurrency = false;
            }
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose}
                };
            },
            reducer(state, action) {
                if (state.loan > 0)
                    return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },
        payLoan(state, _) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state, _) {
            state.isConvertingCurrency = true;
        }
    }
});

const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_CONVERTING_CURRENCY = "account/convertingCurrency";

async function currencyConvert(currency, amount) {
  const api = "https://api.frankfurter.dev";
  const res = await fetch(`${api}/v2/rate/${currency}/usd`);
  const data = await res.json();
  return data.rate * amount;
}

// Make the action our-selve, with action-type of the same naming convention
export function deposit(amount, currency) {
    if (currency === "USD")
        return {
            type: ACCOUNT_DEPOSIT,
            payload: {amount, currency}
        };

    return async function(dispatch, ) {
        dispatch({
            type: ACCOUNT_CONVERTING_CURRENCY
        });
        
        const usd = await currencyConvert(currency, amount);
        dispatch({
            type: ACCOUNT_DEPOSIT,
            payload: {amount: usd, currency: "USD"}
        });
    }
}


export const {withdraw, requestLoan, payLoan} = accountSlice.actions;
export default accountSlice.reducer;