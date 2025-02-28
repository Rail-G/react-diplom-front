import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartFinallyOrder } from "../../components/Main/Pages/CardItemPage/CardItemTools/CardItemTools"


const initialState: CartState = {
    cartItems: [],
    orderQuantity: 0
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addCartItems: (state, action: PayloadAction<CartFinallyOrder>) => {
            state.cartItems = [...state.cartItems, action.payload];
            state.orderQuantity = ++state.orderQuantity
        },
        updateQuantityCartItem: (state, action: PayloadAction<{id: number, quantity: number}>) => {
            state.cartItems = state.cartItems.map((order: CartFinallyOrder) => order.id == action.payload.id ? {...order, quantity: order.quantity += action.payload.quantity} : order)
        },
        deleteCartItem: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((order: CartFinallyOrder) => order.id != action.payload);
            state.orderQuantity = --state.orderQuantity
        },
        clearCartItem: (state) => {
            state.cartItems = [];
            state.orderQuantity = 0
        }
    }
})

export const {addCartItems, updateQuantityCartItem, deleteCartItem, clearCartItem} = cartSlice.actions
export type cartAction = ReturnType<typeof cartSlice.actions[keyof typeof cartSlice.actions]>
export default cartSlice.reducer