const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: ""
};

const CREATE_CUSTOMER = "customer/createCustomer";
const UPDATE_CUSTOMER_NAME = "customer/updateName";

function customerReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_CUSTOMER:
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt
            };
        
        case UPDATE_CUSTOMER_NAME:
            return {
                ...state,
                fullName: action.payload
            };

        default:
            return state;
    }
}

function createCustomer(fullName, nationalId) {
    return {
        type: CREATE_CUSTOMER,
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString()
        }
    };
}

function updateCustomerName(fullName) {
    return {
        type: UPDATE_CUSTOMER_NAME,
        payload: fullName
    };
}

export { customerReducer, createCustomer, updateCustomerName }