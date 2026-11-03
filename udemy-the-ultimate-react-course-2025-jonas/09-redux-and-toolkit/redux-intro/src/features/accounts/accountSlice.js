const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isConvertingCurrency: false
};

const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
const ACCOUNT_APPROVE_LOAN = "account/approveLoan";
const ACCOUNT_PAY_LOAN = "account/payLoan";
const ACCOUNT_CONVERTING_CURRENCY = "account/convertingCurrency";

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_DEPOSIT:
            return {...state, balance: state.balance + action.payload, isConvertingCurrency: false};
        case ACCOUNT_WITHDRAW:
            return {...state, balance: state.balance - action.payload};
        case ACCOUNT_REQUEST_LOAN:
            if (state.loan > 0)
                return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose
            };
        case ACCOUNT_APPROVE_LOAN:
            if (state.loan === 0)
                return state;
            return {...state, balance: state.balance + state.loan};
        case ACCOUNT_PAY_LOAN:
            return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan};
        case ACCOUNT_CONVERTING_CURRENCY:
            return {...state, isConvertingCurrency: true};
        default:
            return state;
    }
}

async function currencyConvert(currency, amount) {
  const api = "https://api.frankfurter.dev";
  const res = await fetch(`${api}/v2/rate/${currency}/usd`);
  const data = await res.json();
  return data.rate * amount;
}

function deposit(amount, currency) {
    if (currency === "USD")
        return {
            type: ACCOUNT_DEPOSIT,
            payload: amount
        };

    return async function(dispatch, ) {
        dispatch({
            type: ACCOUNT_CONVERTING_CURRENCY
        });
        
        const usd = await currencyConvert(currency, amount);
        dispatch({
            type: ACCOUNT_DEPOSIT,
            payload: usd
        });
    }
}

function withdraw(amount) {
    return {
        type: ACCOUNT_WITHDRAW,
        payload: amount
    };
}

function requestLoan(amount, purpose) {
    return {
        type: ACCOUNT_REQUEST_LOAN,
        payload: {
            amount,
            purpose
        }
    };
}

function approveLoan() {
    return {
        type: ACCOUNT_APPROVE_LOAN
    }
}

function payLoan() {
    return {
        type: ACCOUNT_PAY_LOAN
    }
}

export {accountReducer, deposit, withdraw, requestLoan, approveLoan, payLoan}