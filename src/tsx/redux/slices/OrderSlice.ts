import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: OrderState = {
  orderData: null,
  loading: false,
  error: null,
  orderQuantity: 0,
  serverResponse: false,
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    sendOrderDataToServer: (state, action: PayloadAction<OrderData>) => {
      state.loading = true;
      state.error = null;
      state.orderData = action.payload;
      state.serverResponse = false;
    },
    sendOrderDataToServerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.orderData = null;
      state.serverResponse = true;
    },
    sendOrderDataToServerError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.serverResponse = false;
    },
    changeOrderQuantity: (state, action: PayloadAction<number>) => {
      state.orderQuantity = action.payload;
    },
    changeServerResponse: (state) => {
      state.serverResponse = false;
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
  changeOrderQuantity,
  changeServerResponse,
  changeErrorMessage,
} = orderSlice.actions;
export type orderAction = ReturnType<
  (typeof orderSlice.actions)[keyof typeof orderSlice.actions]
>;
export default orderSlice.reducer;
