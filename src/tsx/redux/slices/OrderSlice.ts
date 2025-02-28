import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: OrderState = {
  orderData: null,
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    sendOrderDataToServer: (state, action: PayloadAction<OrderData>) => {
      state.loading = true;
      state.error = null;
      state.orderData = action.payload;
    },
    sendOrderDataToServerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.orderData = null;
    },
    sendOrderDataToServerError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeErrorMessage: (state) => {
      state.error = null;
    },
  },
});

export const {
  sendOrderDataToServer,
  sendOrderDataToServerError,
  sendOrderDataToServerSuccess,
  changeErrorMessage,
} = orderSlice.actions;
export type orderAction = ReturnType<
  (typeof orderSlice.actions)[keyof typeof orderSlice.actions]
>;
export default orderSlice.reducer;
