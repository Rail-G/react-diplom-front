import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: CardItemState = {
  card: null,
  loading: false,
  error: null,
  cardId: null,
};

export const cardItemSlice = createSlice({
  name: 'cardItemSlice',
  initialState,
  reducers: {
    searchCardItem: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
      state.cardId = action.payload;
    },
    searchCardItemSuccess: (state, action: PayloadAction<CardItem>) => {
      state.loading = false;
      state.error = null;
      state.card = action.payload;
    },
    searchCardItemError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.card = null;
    },
  },
});

export const {searchCardItem, searchCardItemError, searchCardItemSuccess} =
  cardItemSlice.actions;
export type cardItemAction = ReturnType<
  (typeof cardItemSlice.actions)[keyof typeof cardItemSlice.actions]
>;
export default cardItemSlice.reducer;
