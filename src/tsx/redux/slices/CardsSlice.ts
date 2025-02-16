import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: CardsState = {
  loading: false,
  moreLoading: false,
  error: null,
  moreError: null,
  moreEnd: false,
  cards: [] as Card[],
  params: '',
  search: '',
};

const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    searchCards: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.params = action.payload;
    },
    changeSearch: (
      state,
      action: PayloadAction<{search: string; categoryId: string}>,
    ) => {
      state.search = action.payload.search;
    },
    searchCardsSuccess: (state, action: PayloadAction<Card[]>) => {
      state.loading = false;
      state.error = null;
      state.cards = action.payload;
      state.moreEnd = action.payload.length % 6 ? true : false;
    },
    searchMoreCards: (state, action: PayloadAction<string>) => {
      state.moreLoading = true;
      state.moreError = null;
      state.params = action.payload;
    },
    searchMoreCardsSuccess: (state, action: PayloadAction<Card[]>) => {
      state.moreLoading = false;
      state.moreError = null;
      state.moreEnd = action.payload.length ? false : true;
      state.cards = [...state.cards, ...action.payload];
    },
    searchMoreCardsError: (state, action: PayloadAction<string>) => {
      state.moreLoading = false;
      state.moreError = action.payload;
    },
    searchCardsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.cards = [];
      state.params = '';
    },
  },
});

export const {
  searchCards,
  searchCardsError,
  searchCardsSuccess,
  changeSearch,
  searchMoreCards,
  searchMoreCardsError,
  searchMoreCardsSuccess,
} = cardsSlice.actions;
export type cardsAction = ReturnType<
  (typeof cardsSlice.actions)[keyof typeof cardsSlice.actions]
>;
export default cardsSlice.reducer;
