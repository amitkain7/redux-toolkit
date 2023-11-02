import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItem: [],
    amount: 0,
    total: 0,
    isLoading: true
}
// Redux-thunk is used for asychronous logic (tasks).
// we can use createAsyncThunk to make asynchronous requests.
// createAsyncThunk take two parameter
// 1 . name of actions
// 2. callback funtion (which returns us a promise) which perform api call 


export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async () => {
        try {  
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
        catch (error) {
            console.log(data)
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItem = []

        },
        removeItem: (state, { payload }) => {
            const id = payload
            const filterItem = state.cartItem.filter((item) => item.id !== id)
            state.cartItem = [...filterItem]
        },
        increaseItem: (state, { payload }) => {
            const id = payload
            const item = state.cartItem.find((item) => item.id == id)
            item.amount += 1;

        },
        decreaseItem: (state, { payload }) => {
            const id = payload
            const item = state.cartItem.find((item) => item.id == id)
            item.amount -= 1

        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItem.forEach((item) => {
                amount += item.amount,
                    total += item.amount * item.price
            })
            state.amount = amount,
                state.total = total
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getCartItems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItem= action.payload;
        })
        .addCase(getCartItems.rejected, (state, action) => {
          console.log(action);
          state.isLoading = false;
        });
    }
})



export const { clearCart, removeItem, increaseItem, decreaseItem, calculateTotal } = cartSlice.actions
export default cartSlice.reducer
