import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TopSalesState = {
  cards: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSalesSlice',
  initialState,
  reducers: {
    searchTopSales: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchTopSalesSuccess: (state, action: PayloadAction<Card[]>) => {
      state.loading = false;
      state.error = null;
      state.cards = action.payload;
    },
    searchTopSalesError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.cards = [];
    },
  },
});

export const {searchTopSales, searchTopSalesSuccess, searchTopSalesError} =
  topSalesSlice.actions;
export type topSalesAction = ReturnType<
  (typeof topSalesSlice.actions)[keyof typeof topSalesSlice.actions]
>;
export default topSalesSlice.reducer;
