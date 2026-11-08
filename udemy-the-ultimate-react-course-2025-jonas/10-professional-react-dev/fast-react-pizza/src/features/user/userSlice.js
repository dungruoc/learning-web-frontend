import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getAddress } from "../../services/apiGeocoding";

function getGeoPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export const fetchAddress = createAsyncThunk(
    'user/fetchAddress',
    async function() {
        const positionObj = await getGeoPosition();
        const { latitude, longitude } = positionObj.coords;
        const position = {latitude, longitude};

        const addressObj = await getAddress(position);
        const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

        // payload of fulfilled status
        return {position, address};
    }
)

const initialState = {
    userName: "",
    status: 'idle',
    position: {},
    address: "",
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserName(state, action) {
            state.userName = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(
            fetchAddress.pending,
            (state, _) => {
                state.status = 'loading';
                state.error = '';
            }
        ).addCase(
            fetchAddress.fulfilled,
            (state, action) => {
                state.status = 'idle';
                state.position = action.payload.position;
                state.address = action.payload.address;
            }
        ).addCase(
            fetchAddress.rejected,
            (state, action) => {
                state.error = action.error.message;
                state.status = 'error';
            }
        )
});

export const { updateUserName } = userSlice.actions;

export default userSlice.reducer;